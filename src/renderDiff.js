import _ from 'lodash';
import stringify from './utilities/stringify';

const space = '  ';

const geNodeStr = (prefix, key, value, depth) => {
  const indentStr = depth === 0 ? '' : space.repeat(depth * 2 - 1);
  return `${indentStr}${prefix} ${key}: ${stringify(value, depth, space)}`;
};

const render = (nodes, depth = 0) => {
  const renderers = {
    added: (node, nodeDepth) => geNodeStr('+', node.key, node.value, nodeDepth),
    removed: (node, nodeDepth) => geNodeStr('-', node.key, node.value, nodeDepth),
    unchanged: (node, nodeDepth) => geNodeStr(' ', node.key, node.value, nodeDepth),
    changed: (node, nodeDepth) => [
      geNodeStr('-', node.key, node.oldValue, nodeDepth),
      geNodeStr('+', node.key, node.newValue, nodeDepth),
    ],
    internal: (node, nodeDepth) => geNodeStr(' ', node.key, render(node.children, nodeDepth), nodeDepth),
  };

  const indentStr = space.repeat(depth * 2);
  const nodesStrings = nodes.map(child => renderers[child.type](child, depth + 1));
  const flattenNodesStings = _.flatten(nodesStrings);
  return ['{', ...flattenNodesStings, `${indentStr}}`].join('\n');
};

export default render;
