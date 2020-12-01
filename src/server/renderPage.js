import {renderToStaticMarkup} from 'react-dom/server';
//import {getGoogleTagManagerNoScript, getGoogleTagManagerScript} from '../tag-manager';
import {Helmet} from 'react-helmet';

const renderPage = (chunks, rootComponent, initialState) => {
  renderToStaticMarkup(rootComponent);
  const helmet = Helmet.renderStatic();
  const initialStateJSON = JSON.stringify(initialState)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  const html = `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${helmet.script.toString()}
    ${
  chunks.css
    ? chunks.css
      .map(
        url =>
          `<link href="${
            process.env.NODE_ENV === 'development' ? '' : ''
          }${url}" rel="stylesheet" type="text/css"/>`,
      )
      .join('')
    : ''
}
    ${process.env.NODE_ENV === 'development' ? `<style>#root{display:none}</style>` : ''}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root"></div>
    <script type="text/javascript">
      window.IS_CLIENT=true;
      window.__INITIAL_STATE__=${initialStateJSON};
    </script>

    ${
  chunks.js
    ? chunks.js
      .map(url => {
        return `<script src="${
          process.env.NODE_ENV === 'development' ? '' : ''
        }${url}"></script>`;
      })
      .join('')
    : ''
}
    ${
  process.env.NODE_ENV === 'development'
    ? `<script>document.getElementById('root').style.display='flex';</script>`
    : ''
}
  </body>
</html>`;
  return html;
};

export default renderPage;
