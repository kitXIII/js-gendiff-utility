import renderSimple from './renderSimple';
import renderPlain from './renderPlain';

const renderers = {
  simple: renderSimple,
  plain: renderPlain,
};

export default (ast, format) => renderers[format](ast);
