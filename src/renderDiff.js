import _ from 'lodash';

const space = '  ';
const indentStr = depth => space.repeat(depth * 2 + 1);
const closingBraceIndentStr = depth => space.repeat(depth * 2);

const stringify = (obj, depth = 0) => {
  const result = _.keys(obj).reduce((acc, key) => {
    const val = obj[key] instanceof Object
      ? stringify(obj[key], depth + 1)
      : obj[key];
    return `${acc}${indentStr(depth)}${space}${key}: ${val}\n`;
  }, '');
  return `{\n${result}${closingBraceIndentStr(depth)}}`;
};

const getItemStr = (prefix, key, value, depth) => {
  const val = value instanceof Object ? stringify(value, depth + 1) : value;
  return `${indentStr(depth)}${prefix}${key}: ${val}`;
};

const prefixes = { added: '+ ', removed: '- ', unchanged: '  ' };

const renders = [
  {
    check: node => _.has(node, 'children'),
    render: (node, depth, fn) => `${indentStr(depth)}${prefixes.unchanged}${node.key}: ${fn(node.children, depth + 1)}`,
  },
  {
    check: node => node.status in prefixes,
    render: (node, depth) => getItemStr(prefixes[node.status], node.key, node.value, depth),
  },
  {
    check: node => node.status === 'changed',
    render: (node, depth) => `${getItemStr(prefixes.removed, node.key, node.oldValue, depth)}\n${getItemStr(prefixes.added, node.key, node.value, depth)}`,
  },
];

const renderDiff = (array, depth = 0) => {
  const result = array.reduce((acc, node) => {
    const { render } = _.find(renders, ({ check }) => check(node));
    return `${acc}${render(node, depth, renderDiff)}\n`;
  }, '');
  return `{\n${result}${closingBraceIndentStr(depth)}}`;
};

export default renderDiff;
