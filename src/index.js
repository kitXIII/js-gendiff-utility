import _ from 'lodash';

const fs = require('fs');

const getObjFromJsonFile = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));

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
  const objFirst = getObjFromJsonFile(firstPath);
  const objSecond = getObjFromJsonFile(secondPath);

  const keys = Object.keys({ ...objFirst, ...objSecond });
  const resultStr = keys.reduce((accStr, key) => `${accStr}  ${genDiffStrByKey(key, objFirst, objSecond)}\n`, '');

  return `{\n${resultStr}}`;
};

export default genDiff;
