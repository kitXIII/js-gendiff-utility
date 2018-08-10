import AddedNode from './AddedNode';
import RemovedNode from './RemovedNode';


export default class ChangedNode {
  constructor(key, newValue, oldValue) {
    this.newValue = new AddedNode(key, newValue);
    this.oldValue = new RemovedNode(key, oldValue);
  }

  toString(depth = 0, space = '  ') {
    return `${this.oldValue.toString(depth, space)}\n${this.newValue.toString(depth, space)}`;
  }
}
