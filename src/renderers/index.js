import renderSimple from './renderPretty';
import renderPlain from './renderPlain';

const renderers = {
  pretty: renderSimple,
  plain: renderPlain,
};

export default (ast, format) => renderers[format](ast);
