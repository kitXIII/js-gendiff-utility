#!/usr/bin/env node

import commander from 'commander';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
