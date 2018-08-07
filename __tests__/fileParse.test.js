import fileParse from '../src/parsers/fileParse';
import JsonParse from '../src/parsers/JsonParse';
import YamlParse from '../src/parsers/YamlParse';
import IniParse from '../src/parsers/IniParse';

const path = require('path');

const jsonFilePath = path.resolve(__dirname, '__fixtures__/before.json');
const yamlFilePath = path.resolve(__dirname, '__fixtures__/before.yml');
const iniFilePath = path.resolve(__dirname, '__fixtures__/before.ini');


test('Test fileParse JSON format', () => {
  expect(fileParse(jsonFilePath)).toBeInstanceOf(JsonParse);
});

test('Test fileParse YAML format', () => {
  expect(fileParse(yamlFilePath)).toBeInstanceOf(YamlParse);
});

test('Test fileParse Ini format', () => {
  expect(fileParse(iniFilePath)).toBeInstanceOf(IniParse);
});
