import JsonParser from './JsonParser';
import YamlParser from './YamlParser';

const path = require('path');

export default (filename) => {
  const type = path.extname(filename);
  switch (type) {
    case '.json':
      return new JsonParser(filename);
    case '.yml':
      return new YamlParser(filename);
    default:
      throw Error('Uses an incorrect input file format');
  }
};
