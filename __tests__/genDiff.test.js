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
  const result = fs.readFileSync(resultPath, 'utf8');
  expect(genDiff(firstJsonPath, secondJsonPath)).toBe(result);
});

test('Get diff two yaml files', () => {
  const result = fs.readFileSync(resultPath, 'utf8');
  expect(genDiff(firstYamlPath, secondYamlPath)).toBe(result);
});

test('Get diff two ini files', () => {
  const result = fs.readFileSync(resultPath, 'utf8');
  expect(genDiff(firstIniPath, secondIniPath, 'ini')).toBe(result);
});

test('Check wrong file type', () => {
  expect(genDiff('file1.wrong', 'file2.wrong')).toMatch(/^Unsupported data type, use one of the following types/);
});

test('Check different files extensions', () => {
  expect(genDiff('file1.ini', 'file2.json')).toMatch(/^Different types of congig files, use files of the same type/);
});
