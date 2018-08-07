import genDiff from '../src';

const fs = require('fs');
const path = require('path');

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(resultPath, 'utf8');

const firstPath = path.resolve(__dirname, '__fixtures__/before.json');
const secondPath = path.resolve(__dirname, '__fixtures__/after.json');

test('Get diff two json files', () => {
  expect(genDiff(firstPath, secondPath, 'json')).toBe(result);
});
