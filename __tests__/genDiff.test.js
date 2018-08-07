import genDiff from '../src';

const fs = require('fs');
const path = require('path');

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(resultPath, 'utf8');

const firstJsonPath = path.resolve(__dirname, '__fixtures__/before.json');
const secondJsonPath = path.resolve(__dirname, '__fixtures__/after.json');

const firstYamlPath = path.resolve(__dirname, '__fixtures__/before.yml');
const secondYamlPath = path.resolve(__dirname, '__fixtures__/after.yml');

test('Get diff two json files', () => {
  expect(genDiff(firstJsonPath, secondJsonPath)).toBe(result);
});

test('Get diff two yaml files', () => {
  expect(genDiff(firstYamlPath, secondYamlPath)).toBe(result);
});
