import Node from './Node';

export default class UnchangedNode extends Node {
  constructor(key, value) {
    super(key, value);
    this.prefix = ' ';
  }
}
