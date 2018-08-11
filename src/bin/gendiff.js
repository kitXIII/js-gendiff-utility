#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.0.19')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', /^(pretty|plain|json)$/i, 'pretty')
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
