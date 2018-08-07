const fs = require('fs');
const yaml = require('js-yaml');

export default class YamlParse {
  constructor(fileName) {
    this.obj = this.getObjectFromFile(fileName);
  }

  parse = rowData => yaml.safeLoad(rowData);

  getObjectFromFile = filePath => this.parse(fs.readFileSync(filePath, 'utf8'));
}
