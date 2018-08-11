import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: safeLoad,
  ini: iniParse,
};

export default (data, type) => {
  const parser = parsers[type](data);

  if (!parser) {
    const errorStr = `Data type ${type} is not supported`;
    throw new Error(errorStr);
  }

  return parser;
};
