import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const genDiffByKey = (key, obj1, obj2) => {
    if (!_.has(obj1, key)) {
      return { type: 'added', key, value: obj2[key] };
    }

    if (!_.has(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] };
    }

    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      const diff = buildDiff(obj1[key], obj2[key]);
      return { type: 'nested', key, children: diff };
    }

    if (obj1[key] === obj2[key]) {
      return { type: 'unchanged', key, value: obj1[key] };
    }

    return {
      type: 'changed',
      key,
      newValue: obj2[key],
      oldValue: obj1[key],
    };
  };

  const keys = _.union(_.keys(object1), _.keys(object2));
  return keys.map(key => genDiffByKey(key, object1, object2));
};

export default buildDiff;
