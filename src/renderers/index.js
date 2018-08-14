import renderPretty from './renderPretty';
import renderPlain from './renderPlain';

const renderers = {
  pretty: renderPretty,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (ast, format) => {
  const render = renderers[format](ast);

  if (!render) {
    const errorStr = `Output format ${format} is not supported`;
    throw new Error(errorStr);
  }

  return render;
};
