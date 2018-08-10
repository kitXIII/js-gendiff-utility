import _ from 'lodash';
import AddedNode from './nodes/AddedNode';
import RemovedNode from './nodes/RemovedNode';
import InternalNode from './nodes/InternalNode';
import UnchangedNode from './nodes/UnchangedNode';
import ChangedNode from './nodes/ChangedNode';

const buildDiff = (object1, object2) => {
  const buildNode = (key, obj1, obj2) => {
    if (!_.has(obj1, key)) {
      return new AddedNode(key, obj2[key]);
    }

    if (!_.has(obj2, key)) {
      return new RemovedNode(key, obj1[key]);
    }

    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      const diff = buildDiff(obj1[key], obj2[key]);
      return new InternalNode(key, diff);
    }

    if (obj1[key] === obj2[key]) {
      return new UnchangedNode(key, obj1[key]);
    }

    return new ChangedNode(key, obj2[key], obj1[key]);
  };

  const keys = _.union(_.keys(object1), _.keys(object2));
  return keys.reduce((acc, key) => [...acc, buildNode(key, object1, object2)], []);
};

export default (obj1, obj2) => new InternalNode(null, buildDiff(obj1, obj2));
