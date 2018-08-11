// import _ from 'lodash';
import stringify from './utilities/stringify';

const space = '  ';
// const indentStr = depth => space.repeat(depth * 2 + 1);

const getItemStr = (prefix, key, value, depth) => {
  const indentStr = depth === 0 ? '' : space.repeat(depth * 2 - 1);
  return `${indentStr}${prefix} ${key}: ${stringify(value, depth, space)}`;
};

const renders = [
  {
    added: (node, depth) => getItemStr('+', node.key, node.value, depth),
  },
  {
    removed: (node, depth) => getItemStr('-', node.key, node.value, depth),
  },
  {
    unchanged: (node, depth) => getItemStr(' ', node.key, node.value, depth),
  },
  {
    changed: (node, depth) => `${getItemStr('-', node.key, node.oldValue, depth)}\n${getItemStr('+', node.key, node.newValue, depth)}`,
  },
  {
    internal: (node, depth) => {
      const indentStr = space.repeat(depth * 2);
      const str = node.children.map(child => renders[child.type](child, depth + 1)).join('\n');
      const keyStr = this.key ? `${indentStr}${this.key}: ` : '';
      return `${keyStr}{\n${str}\n${indentStr}}`;
    },
  },
];

const render = ast => renders.internal({ key: null, children: ast }, 0);

export default render;
