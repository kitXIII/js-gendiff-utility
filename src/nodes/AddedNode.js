import Node from './Node';

export default class AddedNode extends Node {
  constructor(key, value) {
    super(key, value);
    this.prefix = '+';
  }
}
