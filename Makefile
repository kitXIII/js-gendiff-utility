install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

publish:
	rm -rf dist
	npm publish

lint:
	npm run eslint .

test:
	npm test
