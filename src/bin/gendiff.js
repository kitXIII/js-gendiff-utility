#!/usr/bin/env node

import commander from 'commander';
import utility from '..';

const program = commander;

program
  .version('0.0.6')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'json')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const type = options.format;
    console.log(utility(firstConfig, secondConfig, type));
  })
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
