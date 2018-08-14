#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format: pretty | plain | json', /^(pretty|plain|json)$/i, 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const { format } = options;
    try {
      const result = genDiff(firstConfig, secondConfig, format);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  })
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
