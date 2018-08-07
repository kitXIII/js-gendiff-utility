import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');

const firstJsonPath = path.resolve(__dirname, '__fixtures__/before.json');
const secondJsonPath = path.resolve(__dirname, '__fixtures__/after.json');

const firstYamlPath = path.resolve(__dirname, '__fixtures__/before.yml');
const secondYamlPath = path.resolve(__dirname, '__fixtures__/after.yml');

const firstIniPath = path.resolve(__dirname, '__fixtures__/before.ini');
const secondIniPath = path.resolve(__dirname, '__fixtures__/after.ini');

test('Get diff two json files', () => {
  const firstRawData = fs.readFileSync(firstJsonPath, 'utf8');
  const secondRawData = fs.readFileSync(secondJsonPath, 'utf8');
  const result = fs.readFileSync(resultPath, 'utf8');
  expect(genDiff(firstRawData, secondRawData, 'json')).toBe(result);
});

test('Get diff two yaml files', () => {
  const firstRawData = fs.readFileSync(firstYamlPath, 'utf8');
  const secondRawData = fs.readFileSync(secondYamlPath, 'utf8');
  const result = fs.readFileSync(resultPath, 'utf8');
  expect(genDiff(firstRawData, secondRawData, 'yml')).toBe(result);
});

test('Get diff two ini files', () => {
  const firstRawData = fs.readFileSync(firstIniPath, 'utf8');
  const secondRawData = fs.readFileSync(secondIniPath, 'utf8');
  const result = fs.readFileSync(resultPath, 'utf8');
  expect(genDiff(firstRawData, secondRawData, 'ini')).toBe(result);
});
