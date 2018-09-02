import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: safeLoad,
  ini: iniParse,
};

export default (data, type) => {
  const parse = parsers[type];

  if (!parse) {
    const errorStr = `Data type ${type} is not supported`;
    throw new Error(errorStr);
  }

  return parse(data);
};
