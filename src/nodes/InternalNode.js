export default class InternalNode {
  constructor(key, children = []) {
    this.key = key;
    this.children = children;
  }

  toString(depth = 0, space = '  ') {
    const indentStr = space.repeat(depth * 2);
    const str = this.children.map(child => child.toString(depth + 1)).join('\n');
    const keyStr = this.key ? `${indentStr}${this.key}: ` : '';
    return `${keyStr}{\n${str}\n${indentStr}}`;
  }
}
