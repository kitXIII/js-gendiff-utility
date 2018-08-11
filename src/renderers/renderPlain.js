const valueStr = value => (value instanceof Object ? '[complex value]' : `'${value}'`);
const keyStr = (nodeParentStr, key) => `Property '${nodeParentStr}.${key}'`;

const render = (nodes, parentStr = '') => {
  const renderers = {
    added: (node, nodeParentStr) => `${keyStr(nodeParentStr, node.key)} was added with value ${valueStr(node.value)}`,
    removed: (node, nodeParentStr) => `${keyStr(nodeParentStr, node.key)} was removed`,
    changed: (node, nodeParentStr) => `${keyStr(nodeParentStr, node.key)} was updated. From ${valueStr(node.oldValue)} to ${valueStr(node.newValue)}`,
    internal: node => render(node.children, `${node.key}`),
  };

  return nodes.filter(node => node.type !== 'unchanged')
    .map(node => renderers[node.type](node, `${parentStr}`)).join('\n');
};

export default render;
