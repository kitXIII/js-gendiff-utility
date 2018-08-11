import renderSimple from './renderPretty';
import renderPlain from './renderPlain';

const renderers = {
  pretty: renderSimple,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (ast, format) => renderers[format](ast);
