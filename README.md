[![Maintainability](https://api.codeclimate.com/v1/badges/33137a6a1e48050f5c90/maintainability)](https://codeclimate.com/github/kitXIII/project-lvl2-s309/maintainability) [![Issue Count](https://codeclimate.com/github/kitXIII/project-lvl2-s309/badges/issue_count.svg)](https://codeclimate.com/github/kitXIII/project-lvl2-s309) [![Test Coverage](https://api.codeclimate.com/v1/badges/33137a6a1e48050f5c90/test_coverage)](https://codeclimate.com/github/kitXIII/project-lvl2-s309/test_coverage) [![Build Status](https://travis-ci.org/kitXIII/project-lvl2-s309.svg?branch=master)](https://travis-ci.org/kitXIII/project-lvl2-s309) [![NPM Version](http://img.shields.io/npm/v/kit-diff-util.svg?style=flat)](https://www.npmjs.org/package/kit-diff-util)

# Console gendiff utility (JS)


Utility that compares two configuration files and shows a difference.


## Installation


`$ npm install -g kit-diff-util`


![](https://kitxiii.github.io/media/gif/gendiff_inst.gif)


## Get help


`$ gendiff -h`


## Usage


`$ gendiff <firstConfig> <secondConfig>`


To specify format of output file, use --format option:


`$ gendiff --format [type] <firstConfig> <secondConfig>`


#### Supported input file formats

- json
- yml
- ini

#### Supported out data formats

- pretty (json-like view)
- plain text
- json (without indentation)


## Demo


![](https://kitxiii.github.io/media/gif/gendiff_usage.gif)
