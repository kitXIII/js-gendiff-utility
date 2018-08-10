import stringify from '../utilities/stringify';

export default class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prefix = '';
  }

  toString(depth = 0, space = '  ') {
    const indentStr = depth === 0 ? '' : space.repeat(depth * 2 - 1);
    return `${indentStr}${this.prefix} ${this.key}: ${stringify(this.value, depth)}`;
  }
}
