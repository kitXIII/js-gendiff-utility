#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import commander from 'commander';

import utility from '..';

const types = new Set(['json', 'yml', 'ini']);

const handler = (firstConfig, secondConfig, options) => {
  const { format } = options;

  const ext1 = path.extname(firstConfig).toLowerCase();
  const ext2 = path.extname(secondConfig).toLowerCase();

  if (ext1 !== ext2) {
    console.log('Different types of congig files, use files of the same type');
    return null;
  }

  const type = ext1.replace(/^\./, '');
  if (!types.has(type)) {
    const str = `Unsupported file type, use one of the following types: ${[...types].join(' ')}`;
    console.log(str);
    return null;
  }

  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');

  const result = utility(data1, data2, type, format);
  console.log(result);
  return true;
};

const program = commander;

program
  .version('0.0.8')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'txt')
  .arguments('<firstConfig> <secondConfig>')
  .action(handler)
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
