import fileParse from '../src/parsers/fileParse';
import JsonParser from '../src/parsers/JsonParser';
import YamlParser from '../src/parsers/YamlParser';

const path = require('path');

const jsonFilePath = path.resolve(__dirname, '__fixtures__/before.json');
const yamlFilePath = path.resolve(__dirname, '__fixtures__/before.yml');


test('Test fileParse JSON format', () => {
  expect(fileParse(jsonFilePath)).toBeInstanceOf(JsonParser);
});

test('Test fileParse YAML format', () => {
  expect(fileParse(yamlFilePath)).toBeInstanceOf(YamlParser);
});
