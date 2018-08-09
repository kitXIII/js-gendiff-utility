import _ from 'lodash';

const genDiffByKey = (key, obj1, obj2) => {
  if (!_.has(obj1, key)) {
    return { status: 'added', key, value: obj2[key] };
  }

  if (!_.has(obj2, key)) {
    return { status: 'removed', key, value: obj1[key] };
  }

  if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
    const diff = buildDiff(obj1[key], obj2[key]); // eslint-disable-line
    return { status: 'unchanged', key, children: diff };
  }

  if (obj1[key] === obj2[key]) {
    return { status: 'unchanged', key, value: obj1[key] };
  }

  return {
    status: 'changed',
    key,
    value: obj2[key],
    oldValue: obj1[key],
  };
};

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys.reduce((acc, key) => [...acc, genDiffByKey(key, obj1, obj2)], []);
  return result;
};

export default buildDiff;
