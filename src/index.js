import _ from 'lodash';
import fileParse from './parsers/fileParse';

const genDiffStrByKey = (key, obj1, obj2) => {
  if (!_.has(obj1, key)) {
    return `+ ${key}: ${obj2[key]}`;
  }
  if (!_.has(obj2, key)) {
    return `- ${key}: ${obj1[key]}`;
  }
  if (obj1[key] === obj2[key]) {
    return `  ${key}: ${obj1[key]}`;
  }
  return `+ ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
};

const genDiff = (firstPath, secondPath) => {
  const first = fileParse(firstPath);
  const second = fileParse(secondPath);

  const keys = _.union(_.keys(first.obj), _.keys(second.obj));
  const resultStr = keys.reduce((accStr, key) => `${accStr}  ${genDiffStrByKey(key, first.obj, second.obj)}\n`, '');

  return `{\n${resultStr}}`;
};

export default genDiff;
