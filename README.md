[![Maintainability](https://api.codeclimate.com/v1/badges/33137a6a1e48050f5c90/maintainability)](https://codeclimate.com/github/kitXIII/project-lvl2-s309/maintainability) [![Build Status](https://travis-ci.org/kitXIII/project-lvl2-s309.svg?branch=master)](https://travis-ci.org/kitXIII/project-lvl2-s309)

# Console getdiff utility


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
