#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import program from 'commander';
import _ from 'lodash';

import utility from '..';

const types = { '.json': 'json', '.yml': 'yaml', '.ini': 'ini' };

const handler = (firstConfig, secondConfig, options) => {
  try {
    const { format } = options;

    const ext1 = path.extname(firstConfig).toLowerCase();
    const ext2 = path.extname(secondConfig).toLowerCase();

    if (ext1 !== ext2) {
      throw new Error('Different types of congig files, use files of the same type');
    }

    const type = types[ext1];
    if (!type) {
      const str = `Unsupported file type, use one of the following types: ${_.keys(types).join(' ')}`;
      throw new Error(str);
    }

    const data1 = fs.readFileSync(firstConfig, 'utf8');
    const data2 = fs.readFileSync(secondConfig, 'utf8');

    const result = utility(data1, data2, type, format);

    console.log(result);
  } catch (err) {
    console.log(err.message);
    return null;
  }
  return true;
};

program
  .version('0.0.10')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'txt')
  .arguments('<firstConfig> <secondConfig>')
  .action(handler)
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
