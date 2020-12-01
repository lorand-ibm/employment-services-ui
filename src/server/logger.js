import _debug from 'debug';
import morgan from 'morgan';

import {requireEnv} from './helpers';

const MORGAN_STRATEGY = ':date[iso] :method :url => proxied: :drupalUri :status - :response-time ms';

morgan.token('drupalUri', function(req) {
  if (!req.route || !req.params) {
    return;
  }

  const routePath = req.route.path;
  const drupal = requireEnv('DRUPAL_URL');
  const name = decodeURIComponent(req.params.name);
  const language = req.query.language;
  const path = decodeURIComponent(req.params.path);

  switch (routePath) {
    case '/menu/:name':
      return `${drupal}${language ? `/${language}` : ''}/restful_menus/${name}?_format=json`;
    case '/view/:name':
      return `${drupal}${language ? `/${language}` : ''}/restful_entities/view/${name}?_format=json`;
    case '/search':
      return `${drupal}${language ? `/${language}` : ''}/restful_entities/search?_format=json`;
    case '/my-helsinki-users-lists':
      return `${drupal}/restful_entities/my-helsinki-users-lists?_format=json`;
    case '/my-helsinki-users-lists/:nid':
      return `${drupal}/restful_entities/my-helsinki-users-lists/${req.params.nid}`;
    default:
      return `${drupal}${language ? `/${language}` : ''}/restful_entities/by_path?path=${path}&_format=json`;
  }
});

export const getMorgan = () => morgan(MORGAN_STRATEGY);

export const debug = _debug('myhki:server');
