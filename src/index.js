import path from 'path';
import fs from 'fs';
import parse from './parser';
import buildDiff from './buildDiff';

const dataTypes = { '.json': 'json', '.yml': 'yaml', '.ini': 'ini' };

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

  const result = buildDiff(obj1, obj2);
  return result.toString();
};
