import _ from 'lodash';
import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: safeLoad,
  ini: iniParse,
};

const genDiffObjByKey = (key, obj1, obj2) => {
  if (!_.has(obj1, key)) {
    return { [`+ ${key}`]: obj2[key] };
  }
  if (!_.has(obj2, key)) {
    return { [`- ${key}`]: obj1[key] };
  }
  if (obj1[key] === obj2[key]) {
    return { [`  ${key}`]: obj1[key] };
  }
  return { [`+ ${key}`]: obj2[key], [`- ${key}`]: obj1[key] };
};

const genDiff = (firstData, secondData, type) => {
  if (!(type in parsers)) {
    const str = `Unsupported data type, use one of the following types: ${_.keys(parsers).join(' ')}`;
    return str;
  }

  const obj1 = parsers[type](firstData);
  const obj2 = parsers[type](secondData);

  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys.reduce((acc, key) => {
    const diffObj = genDiffObjByKey(key, obj1, obj2);
    return { ...acc, ...diffObj };
  }, {});

  const resultStr = JSON.stringify(result, null, 2).replace(/"|,/g, '');
  return resultStr;
};

export default genDiff;
