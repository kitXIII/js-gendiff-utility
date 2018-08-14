import _ from 'lodash';

const indent = depth => '  '.repeat(depth * 2);

const stringify = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const result = _.keys(obj).map(key => `${indent(depth)}    ${key}: ${stringify(obj[key], depth + 1)}`);
  return ['{', ...result, `${indent(depth)}}`].join('\n');
};

const stringifyNode = (prefix, key, value, depth) => `${indent(depth)}  ${prefix} ${key}: ${stringify(value, depth + 1)}`;

const render = (nodes, depth = 0) => {
  const renderers = {
    added: (node, nodeDepth) => stringifyNode('+', node.key, node.value, nodeDepth),
    removed: (node, nodeDepth) => stringifyNode('-', node.key, node.value, nodeDepth),
    unchanged: (node, nodeDepth) => stringifyNode(' ', node.key, node.value, nodeDepth),
    changed: (node, nodeDepth) => [
      stringifyNode('-', node.key, node.oldValue, nodeDepth),
      stringifyNode('+', node.key, node.newValue, nodeDepth),
    ],
    nested: (node, nodeDepth) => stringifyNode(' ', node.key, render(node.children, nodeDepth + 1), nodeDepth),
  };

  const nodesStrings = nodes.map(child => renderers[child.type](child, depth));
  const flattenNodesStings = _.flatten(nodesStrings);

  return ['{', ...flattenNodesStings, `${indent(depth)}}`].join('\n');
};

export default render;
