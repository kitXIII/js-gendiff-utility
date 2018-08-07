import JsonParse from './JsonParse';
import YamlParse from './YamlParse';

const path = require('path');

export default (filename) => {
  const type = path.extname(filename);
  switch (type) {
    case '.json':
      return new JsonParse(filename);
    case '.yml':
      return new YamlParse(filename);
    default:
      throw Error(`Uses an incorrect input file format ${type}`);
  }
};
