import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parser';

const dataTypes = { '.json': 'json', '.yml': 'yaml', '.ini': 'ini' };

const genDiffObjKey = (key, obj1, obj2) => {
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

const genDiffObj = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys.reduce((acc, key) => {
    const diffObj = genDiffObjKey(key, obj1, obj2);
    return { ...acc, ...diffObj };
  }, {});

  const resultStr = JSON.stringify(result, null, 2).replace(/"|,/g, '');
  return resultStr;
};

export default (firstConfig, secondConfig) => {
  const ext1 = path.extname(firstConfig).toLowerCase();
  const ext2 = path.extname(secondConfig).toLowerCase();

  if (ext1 !== ext2) {
    return null;
  }

  const type = dataTypes[ext1];
  if (!type) {
    return null;
  }

  const obj1 = parse(fs.readFileSync(firstConfig, 'utf8'), type);
  const obj2 = parse(fs.readFileSync(secondConfig, 'utf8'), type);

  const result = genDiffObj(obj1, obj2);

  return result;
};
