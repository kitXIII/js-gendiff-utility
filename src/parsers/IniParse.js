const fs = require('fs');
const ini = require('ini');

export default class IniParse {
  constructor(fileName) {
    this.obj = this.getObjectFromFile(fileName);
  }

  parse = rowData => ini.parse(rowData);

  getObjectFromFile = filePath => this.parse(fs.readFileSync(filePath, 'utf8'));
}
