import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.ini': iniParse,
};

export default (data, ext) => {
  if (!(ext in parsers)) {
    const str = `There is no suitable parser for this type of file ${ext}`;
    throw new Error(str);
  }
  return parsers[ext](data);
};
