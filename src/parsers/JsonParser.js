const fs = require('fs');

export default class JsonParser {
  constructor(fileName) {
    this.obj = this.getObjectFromFile(fileName);
  }

  parse = rowData => JSON.parse(rowData);

  getObjectFromFile = filePath => this.parse(fs.readFileSync(filePath, 'utf8'));
}
