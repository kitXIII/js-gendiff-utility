import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parser';

const dataTypes = { '.json': 'json', '.yml': 'yaml', '.ini': 'ini' };

const genDiffByKey = (key, obj1, obj2) => {
  if (!_.has(obj1, key)) {
    return ['+', key, obj2[key]];
  }
  if (!_.has(obj2, key)) {
    return ['-', key, obj1[key]];
  }
  if (obj1[key] === obj2[key]) {
    return [' ', key, obj1[key]];
  }
  return [['+', key, obj2[key]], ['-', key, obj1[key]]];
};

const genDiffArray = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const resultArray = keys.reduce((acc, key) => [...acc, genDiffByKey(key, obj1, obj2)], []);
  const result = _.chunk(_.flattenDepth(resultArray, 2), 3);
  return result;
};

const diffArrayToStr = arr => `{${arr.reduce((acc, item) => `${acc}\n  ${item[0]} ${item[1]}: ${item[2]}`, '')}\n}`;

export default (firstConfig, secondConfig) => {
  const ext1 = path.extname(firstConfig).toLowerCase();
  const ext2 = path.extname(secondConfig).toLowerCase();

  const type1 = dataTypes[ext1];
  const type2 = dataTypes[ext2];

  if (!type1 || !type2) {
    return null;
  }

  const obj1 = parse(fs.readFileSync(firstConfig, 'utf8'), type1);
  const obj2 = parse(fs.readFileSync(secondConfig, 'utf8'), type2);

  const result = genDiffArray(obj1, obj2);

  return diffArrayToStr(result);
};
