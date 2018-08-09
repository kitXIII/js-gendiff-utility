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

const statusHandlers = {
  unchanged: (item, depth) => getItemStr('  ', item.key, item.value, depth),
  changed: (item, depth) => `${getItemStr('- ', item.key, item.oldValue, depth)}\n${getItemStr('+ ', item.key, item.value, depth)}`,
  added: (item, depth) => getItemStr('+ ', item.key, item.value, depth),
  removed: (item, depth) => getItemStr('- ', item.key, item.value, depth),
};

const render = (array, depth = 0) => {
  const result = array.reduce((acc, node) => {
    if (_.has(node, 'children')) {
      const value = render(node.children, depth + 1);
      return `${acc}${indentStr(depth)}  ${node.key}: ${value}\n`;
    }
    return `${acc}${statusHandlers[node.status](node, depth)}\n`;
  }, '');
  return `{\n${result}${closingBraceIndentStr(depth)}}`;
};

export default render;
