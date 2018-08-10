import Node from './Node';

export default class RemovedNode extends Node {
  constructor(key, value) {
    super(key, value);
    this.prefix = '-';
  }
}
