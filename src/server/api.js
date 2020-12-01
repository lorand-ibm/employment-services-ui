// @flow
import express from 'express';
import get from 'lodash/get';
import has from 'lodash/has';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import useragent from 'express-useragent';
import nodemailer from 'nodemailer';
import traverse from 'traverse';

import {
  requireEnv,
  getPhotoGridData,
  getTwitterQuoteData,
  getAxiosBaseClient,
  cookiePassthrough,
  getCachedAxiosClient,
  getCacheIsBypassed,
  getLanguage,
  getCacheIsDisabled,
} from './helpers';

const api = express.Router();
api.use(useragent.express());

const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_ACCOUNT,
    pass: process.env.SMTP_PASSWORD,
  }
});

const cachedAxios = getCachedAxiosClient();

const removableUidFields = ['name', 'mail', 'init', 'roles'];
const isRemovableUidField = (path) => {
  return path
    && path.length > 3
    && path[path.length - 3] === 'uid' // parent as of [ 'uid', '0', 'mail' ]
    && removableUidFields.includes(path[path.length - 1])
}

const cleanupContentWriterDetails = (json) => {
  const cleanedData = traverse(json).map(function (x) {
    if (isRemovableUidField(this.path)) {
      this.remove();
    }
  });
  return cleanedData;
}

api.get('/path/:path', async (req, res) => {
  const path = decodeURIComponent(req.params.path);
  const language = getLanguage(req.query);
  const cacheIsBypassed = getCacheIsBypassed(req.query);
  const cacheIsDisabled = getCacheIsDisabled(path);

  // @todo This block of code was originally created to handle external redirects.
  //   Currently it wouldn't do anything because "request" isn't used anywhere. The
  //   logic should be re-implemented into the cached axios responses. More info:
  //   https://app.clubhouse.io/futurice-hema/story/698/external-redirects-do-not-work
  // const request = cookiePassthrough(req, getAxiosBaseClient());
  // request.interceptors.response.use(response => {
  //   const lastUrl = getLastUrlFromResponse(response);
  //   if (isCmsUrl(lastUrl)) {
  //     return response;
  //   }
  //   return Promise.reject({response, externalRedirect: lastUrl});
  // });

  try {
    // API url language prefix needs to match the language of the content that
    // is being retrieved. Otherwise Drupal's dynamic page cache won't work
    // properly due to a bug related to the custom language negotiator.
    // @link https://app.clubhouse.io/futurice-hema/story/311/rest-api-by-path-endpoint-is-unable-to-utilize-dynamic-cache
    const requestUrl = `/${language}/restful_entities/by_path`;
    const requestOptions = {
      params: {
        path: path,
        _format: 'json',
      },
      forceUpdate: cacheIsBypassed,
    };
    if (cacheIsDisabled) {
      requestOptions.cache = false;
    }
    const {data} = await cachedAxios.get(requestUrl, requestOptions);

    const cleanedData = cleanupContentWriterDetails(data);
    const twitterData = get(cleanedData, 'field_twitter[0]');
    data.twitterData = null;

    if (twitterData) {
      try {
        cleanedData.twitterData = await getTwitterQuoteData(twitterData);
      } catch (e) {
        // Some error handling?
      }
    }

    res.send(cleanedData);
  } catch (e) {
    if (has(e, 'externalRedirect')) {
      res.send({redirect_location: e.externalRedirect});
    } else if (has(e, 'response.status')) {
      const {status, statusText = ''} = e.response;
      res.status(status).send({message: statusText});
    } else {
      console.log('Unexpected error');
      console.error(e);
      res.status(500).send({message: 'Server error'});
    }
  }
});

api.get('/menu/:name', async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const cacheIsBypassed = getCacheIsBypassed(req.query);
  const language = getLanguage(req.query);

  try {
    const requestUrl = `/${language}/restful_menus/${name}`;
    const requestOptions = {
      params: {
        _format: 'json',
      },
      forceUpdate: cacheIsBypassed,
    };
    const {data} = await cachedAxios.get(requestUrl, requestOptions);
    res.send(data);
  } catch (e) {
    const {response} = e;
    const status = response ? response.status : 500;
    const statusText = response ? response.statusText : (e.errno || 'unknown error');
    res.status(status).send({message: statusText});
  }
});

api.get('/view/:name', async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const cacheIsBypassed = getCacheIsBypassed(req.query);
  const language = getLanguage(req.query);

  try {
    const requestUrl = `/${language}/restful_entities/view/${name}`;
    const requestOptions = {
      params: {
        _format: 'json',
      },
      forceUpdate: cacheIsBypassed,
    };
    const {data} = await cachedAxios.get(requestUrl, requestOptions);
    res.send(data);
  } catch (e) {
    const {status, statusText} = e.response;
    res.status(status).send({message: statusText});
  }
});

api.get('/search', async (req, res) => {
  const {query} = req,
    language = query.language,
    request = cookiePassthrough(req, getAxiosBaseClient());

  const paramsMap = {
      keywords: 'keywords',
      type: 'type',
      tags: 'tag',
      category: 'category',
      dateFrom: 'date_from',
      dateTo: 'date_to',
      sort: 'sort',
      stickyHema: 'sticky_hema',
    },
    params = {},
    offset = query.page ? Number(query.page) * 10 - 10 : 0;

  forEach(paramsMap, (paramKey, queryKey) => {
    if (!isEmpty(query[queryKey])) {
      params[paramKey] = query[queryKey];
    }
  });

  try {
    const {data} = await request.get(`${language ? `/${language}` : ''}/restful_entities/search`, {
      params: {
        ...params,
        offset: offset,
        _format: 'json',
      },
    });

    res.send(data);
  } catch (e) {
    const {status, statusText} = e.response;
    res.status(status).send({message: statusText});
  }
});

api.get('/my-helsinki-users-lists', async (req, res) => {
  const request = cookiePassthrough(req, getAxiosBaseClient()),
    {query} = req;

  try {
    // @todo Figure out if this request works correctly, "userd" below looks like a typo of "userId".
    const {data} = await request.get(`/restful_entities/myhelsinki_users_lists`, {
      params: {
        _format: 'json',
        langcode: query.language,
        userid: query.userd,
      },
    });

    res.send(data);
  } catch (e) {
    const {status, statusText} = e.response;
    res.status(status).send({message: statusText});
  }
});

api.post('/my-helsinki-list', async (req, res) => {
  try {
    const csrfRequest = cookiePassthrough(req, getAxiosBaseClient());
    const csrfToken = await csrfRequest.post('/rest/session/token', {}); // TODO: Automatically inject the CSRF token at a lower level.

    const request = cookiePassthrough(req, getAxiosBaseClient());
    request.defaults.headers['X-CSRF-Token'] = csrfToken.data;
    request.defaults.headers['Content-Type'] = 'application/json';
    const response = await request.post(
      `/restful_entities/myhelsinki_create_list?_format=json`,
      req.body,
    );
    res.send(response.data);
  } catch (e) {
    const {status, statusText} = e.response;
    res.status(status).send({message: statusText});
  }
});

api.put('/my-helsinki-list/:nid', async (req, res) => {
  try {
    const csrfRequest = cookiePassthrough(req, getAxiosBaseClient());
    const csrfToken = await csrfRequest.post('/rest/session/token', {}); // TODO: Automatically inject the CSRF token at a lower level.
    const request = cookiePassthrough(req, getAxiosBaseClient());
    const nid = decodeURIComponent(req.params.nid);

    request.defaults.headers['X-CSRF-Token'] = csrfToken.data;
    request.defaults.headers['Content-Type'] = 'application/json';
    const body = req.body;
    delete body.nid;

    const items = [];

    if (isArray(body.items)) {
      forEach(body.items, item => {
        items.push(item.nid);
      });
    }
    body.items = items;
    const response = await request.post(
      `/restful_entities/myhelsinki_update_list/${nid}?_format=json`,
      req.body,
    );

    res.send(response.data);
  } catch (e) {
    const {status, statusText} = e.response;
    res.status(status).send({message: statusText});
  }
});

api.delete('/my-helsinki-list/:nid', async (req, res) => {
  try {
    const csrfRequest = cookiePassthrough(req, getAxiosBaseClient());
    const csrfToken = await csrfRequest.post('/rest/session/token', {}); // TODO: Automatically inject the CSRF token at a lower level.
    const request = cookiePassthrough(req, getAxiosBaseClient());
    const nid = decodeURIComponent(req.params.nid);

    request.defaults.headers['X-CSRF-Token'] = csrfToken.data;
    request.defaults.headers['Content-Type'] = 'application/json';
    await request.delete(`/restful_entities/myhelsinki_update_list/${nid}?_format=json`, req.body);
    res.status(200).send({message: 'Ok'});
  } catch (e) {
    const {status, statusText} = e.response;
    res.status(status).send({message: statusText});
  }
});

api.post('/send-feedback', async (req, res) => {
  try {
    const csrfRequest = cookiePassthrough(req, getAxiosBaseClient());
    const csrfToken = await csrfRequest.post('/rest/session/token', {}); // TODO: Automatically inject the CSRF token at a lower level.
    const request = cookiePassthrough(req, getAxiosBaseClient());
    const feedback = req.body;

    request.defaults.headers['X-CSRF-Token'] = csrfToken.data;
    request.defaults.headers['Content-Type'] = 'application/json';
    feedback.field_browser = `${req.useragent.browser} ${req.useragent.version}`;
    feedback.field_device = req.useragent.platform;
    feedback.field_operating_system = req.useragent.os;

    const response = await request.post(`/restful_entities/feedback_create?_format=json`, feedback);
    res.send(response.data);
  } catch (e) {
    const {status, statusText} = e.response;

    res.status(status).send({message: statusText});
  }
});

api.put('/user/:uid', async (req, res) => {
  try {
    const csrfRequest = cookiePassthrough(req, getAxiosBaseClient());
    const csrfToken = await csrfRequest.post('/rest/session/token', {}); // TODO: Automatically inject the CSRF token at a lower level.
    const request = cookiePassthrough(req, getAxiosBaseClient());

    request.defaults.headers['X-CSRF-Token'] = csrfToken.data;
    request.defaults.headers['Content-Type'] = 'application/json';

    const body = req.body,
      data = {
        name: body.displayName,
      };

    const response = await request.post(`/user_resource?_format=json`, data);

    switch (response.status) {
      case 200:
        //const userCookie = `MYHKI_USER=${userData}; Max-Age=2000000; path=/; domain=${cookieDomain};`;
        const user = {
          ...body,
          displayName: response.data.name,
        };
        res.cookie('MYHKI_USER', JSON.stringify(user), {
          maxAge: 2000000,
          path: '/',
          domain: requireEnv('COOKIE_DOMAIN'),
        });
        res.send(user);
        break;
      default:
        res.send(response.data);
    }
  } catch (e) {
    const {status, statusText} = e.response;

    res.status(status).send({message: statusText});
  }
});

api.post('/save-questionnaire', async (req, res) => {
  const ok = 'ok';
  const fail = 'fail';
  const validRecipientDomains = ['myhelsinki.fi'];

  try {
    const apiKey = req.header('x-apikey');

    if (!apiKey || apiKey !== process.env.NODE_APIKEY) {
      console.error(`ERROR: send email request denied due missing or wrong api key: ${apiKey}`);
      return res.send(fail);
    }

    const {recipient, data} = req.body;

    // validations
    const parts = recipient.split('@');
    const domain = parts.length > 1 ? parts[1].trim() : '<missing>';
    if (!validRecipientDomains.includes(domain)) {
      console.error(`ERROR: email sending not allowed for recipient ${recipient}. Allowed domains are ${validRecipientDomains.join(', ')}`);
      return res.send(fail);
    }

    let status = await smtpTransporter.sendMail({
      from: 'smtp@myhelsinki.fi',
      to: recipient,
      subject: 'MyHelsinki questionnaire results',
      text: data,
    });

    if (status.response !== '250 Message received') {
      console.error('ERROR: email sending failed, response: ', JSON.stringify(status));
      return res.send(fail);
    }
  } catch (e) {
    console.error('ERROR: email sending failed: ', JSON.stringify(e));
    return res.send(fail);
  }
  return res.send(ok);
});

api.get('/', (req, res) => {
  res.send('Hello from the API!');
});

export default api;
