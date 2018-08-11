import path from 'path';
import fs from 'fs';
import parse from './parser';
import buildDiff from './buildDiff';
import render from './renderers';

const dataTypes = { '.json': 'json', '.yml': 'yaml', '.ini': 'ini' };

const readFileToObj = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  const type = dataTypes[ext];
  if (!type) {
    throw new Error(`File type ${ext} is not supported`);
  }

  return parse(fs.readFileSync(fileName, 'utf8'), type);
};

export default (firstConfig, secondConfig, format) => {
  const obj1 = readFileToObj(firstConfig);
  const obj2 = readFileToObj(secondConfig);

  const result = buildDiff(obj1, obj2);
  return render(result, format);
};
