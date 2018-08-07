import JsonParser from './JsonParser';
import YamlParser from './YamlParser';

export default (filename, type) => {
  switch (type) {
    case 'json':
      return new JsonParser(filename);
    case 'yaml':
      return new YamlParser(filename);
    default:
      throw Error('Uses an incorrect custom format');
  }
};
