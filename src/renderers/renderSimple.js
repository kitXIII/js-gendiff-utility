import _ from 'lodash';

const indentStr = depth => '  '.repeat(depth * 2);

const stringify = (obj, depth = 0) => {
  if (!(obj instanceof Object)) {
    return `${obj}`;
  }

  const result = _.keys(obj).reduce((acc, key) => {
    const val = stringify(obj[key], depth + 1);
    return `${acc}${indentStr(depth)}    ${key}: ${val}\n`;
  }, '');
  return `{\n${result}${indentStr(depth)}}`;
};

const getNodeStr = (prefix, key, value, depth) => `${indentStr(depth)}  ${prefix} ${key}: ${stringify(value, depth + 1)}`;

const render = (nodes, depth = 0) => {
  const renderers = {
    added: (node, nodeDepth) => getNodeStr('+', node.key, node.value, nodeDepth),
    removed: (node, nodeDepth) => getNodeStr('-', node.key, node.value, nodeDepth),
    unchanged: (node, nodeDepth) => getNodeStr(' ', node.key, node.value, nodeDepth),
    changed: (node, nodeDepth) => [
      getNodeStr('-', node.key, node.oldValue, nodeDepth),
      getNodeStr('+', node.key, node.newValue, nodeDepth),
    ],
    internal: (node, nodeDepth) => getNodeStr(' ', node.key, render(node.children, nodeDepth + 1), nodeDepth),
  };

  const nodesStrings = nodes.map(child => renderers[child.type](child, depth));
  const flattenNodesStings = _.flatten(nodesStrings);
  return ['{', ...flattenNodesStings, `${indentStr(depth)}}`].join('\n');
};

export default render;
