const fs = require('fs');

export default class JsonParse {
  constructor(fileName) {
    this.obj = this.getObjectFromFile(fileName);
  }

  parse = rowData => JSON.parse(rowData);

  getObjectFromFile = filePath => this.parse(fs.readFileSync(filePath, 'utf8'));
}
