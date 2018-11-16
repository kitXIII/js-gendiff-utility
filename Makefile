install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

publish:
	npm publish

publish-patch:
	npm version patch
	npm publish

lint:
	npx eslint .

test:
	npm test
