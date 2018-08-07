import fileParse from '../src/parsers/fileParse';
import JsonParser from '../src/parsers/JsonParser';
import YamlParser from '../src/parsers/YamlParser';

const path = require('path');

const jsonFilePath = path.resolve(__dirname, '__fixtures__/before.json');

test('Test fileParse JSON format', () => {
  expect(fileParse(jsonFilePath, 'json')).toBeInstanceOf(JsonParser);
});

test('Test fileParse YAML format', () => {
  expect(fileParse(jsonFilePath, 'yaml')).toBeInstanceOf(YamlParser);
});