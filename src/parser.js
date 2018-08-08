import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: safeLoad,
  ini: iniParse,
};

export default (data, ext) => parsers[ext](data);
