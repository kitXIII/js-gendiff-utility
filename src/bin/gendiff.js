#!/usr/bin/env node

import commander from 'commander';
import utility from '../index';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    // console.log('option: ', this.option);
    utility(firstConfig, secondConfig);
  })
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
