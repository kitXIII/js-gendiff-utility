#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.0.16')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'txt')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const { format } = options;
    const result = genDiff(firstConfig, secondConfig, format);
    console.log(result);
  })
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
