import renderPretty from './renderPretty';
import renderPlain from './renderPlain';

const renderers = {
  pretty: renderPretty,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (ast, format) => renderers[format](ast);
