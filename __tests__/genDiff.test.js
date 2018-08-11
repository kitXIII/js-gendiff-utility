import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const resultPlainPath = path.resolve(__dirname, '__fixtures__/result_plain.txt');

const firstJsonPath = path.resolve(__dirname, '__fixtures__/before.json');
const secondJsonPath = path.resolve(__dirname, '__fixtures__/after.json');

const firstYamlPath = path.resolve(__dirname, '__fixtures__/before.yml');
const secondYamlPath = path.resolve(__dirname, '__fixtures__/after.yml');

const firstIniPath = path.resolve(__dirname, '__fixtures__/before.ini');
const secondIniPath = path.resolve(__dirname, '__fixtures__/after.ini');

describe('Get diff between two files,and output to simple format', () => {
  const result = fs.readFileSync(resultPath, 'utf8');

  test('Get diff json files', () => {
    expect(genDiff(firstJsonPath, secondJsonPath, 'simple')).toBe(result);
  });

  test('Get diff yaml files', () => {
    expect(genDiff(firstYamlPath, secondYamlPath, 'simple')).toBe(result);
  });

  test('Get diff ini files', () => {
    expect(genDiff(firstIniPath, secondIniPath, 'simple')).toBe(result);
  });
});

describe('Get diff between two files,and output to plain text format', () => {
  const result = fs.readFileSync(resultPlainPath, 'utf8');

  test('Get diff json files', () => {
    expect(genDiff(firstJsonPath, secondJsonPath, 'simple')).toBe(result);
  });
});
