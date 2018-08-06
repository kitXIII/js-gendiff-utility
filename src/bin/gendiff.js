#!/usr/bin/env node

import commander from 'commander';
import utility from '../index';

const program = commander;

program
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const type = options.format;
    if (typeof type !== 'undefined') {
      utility(firstConfig, secondConfig);
    } else {
      console.log('Use -f option');
    }
  })
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
