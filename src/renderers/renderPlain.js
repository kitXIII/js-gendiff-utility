const valueStr = val => (val instanceof Object ? '[complex value]' : `${typeof val === 'string' ? `'${val}'` : `${val}`}`);
const keyStr = (parents, key) => `Property '${[...parents, key].join('.')}'`;

const render = (nodes, parents = []) => {
  const renderers = {
    added: (node, nodeParents) => `${keyStr(nodeParents, node.key)} was added with value ${valueStr(node.value)}`,
    removed: (node, nodeParents) => `${keyStr(nodeParents, node.key)} was removed`,
    changed: (node, nodeParents) => `${keyStr(nodeParents, node.key)} was updated. From ${valueStr(node.oldValue)} to ${valueStr(node.newValue)}`,
    internal: (node, nodeParents) => render(node.children, [...nodeParents, node.key]),
  };

  return nodes.filter(node => node.type !== 'unchanged')
    .map(node => renderers[node.type](node, parents)).join('\n');
};

export default render;
