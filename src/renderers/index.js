import _ from 'lodash';
import renderPretty from './renderPretty';
import renderPlain from './renderPlain';

const renderers = {
  pretty: renderPretty,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (ast, format) => {
  if (!_.has(renderers, format)) {
    const errorStr = `Output format ${format} is not supported`;
    throw new Error(errorStr);
  }
  return renderers[format](ast);
};
