import _ from 'lodash';

const wrapQotes = value => (_.isString(value) ? `'${value}'` : value);
const stringifyValue = value => (_.isObject(value) ? '[complex value]' : `${wrapQotes(value)}`);
const stringifyKey = (ancestry, key) => `Property '${[...ancestry, key].join('.')}'`;

const render = (nodes, ancestry = []) => {
  const renderers = {
    added: (node, nodeAncestry) => `${stringifyKey(nodeAncestry, node.key)} was added with value ${stringifyValue(node.value)}`,
    removed: (node, nodeAncestry) => `${stringifyKey(nodeAncestry, node.key)} was removed`,
    changed: (node, nodeAncestry) => `${stringifyKey(nodeAncestry, node.key)} was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`,
    nested: (node, nodeAncestry) => render(node.children, [...nodeAncestry, node.key]),
  };

  return nodes.filter(node => node.type !== 'unchanged')
    .map(node => renderers[node.type](node, ancestry)).join('\n');
};

export default render;
