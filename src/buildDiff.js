import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const handlers = [
    {
      check: (key, obj1) => !_.has(obj1, key),
      getDiff: (key, obj1, obj2) => ({ type: 'added', key, value: obj2[key] }),
    },
    {
      check: (key, obj1, obj2) => !_.has(obj2, key),
      getDiff: (key, obj1) => ({ type: 'removed', key, value: obj1[key] }),
    },
    {
      check: (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
      getDiff: (key, obj1, obj2) => ({ type: 'nested', key, children: buildDiff(obj1[key], obj2[key]) }),
    },
    {
      check: (key, obj1, obj2) => obj1[key] === obj2[key],
      getDiff: (key, obj1) => ({ type: 'unchanged', key, value: obj1[key] }),
    },
    {
      check: (key, obj1, obj2) => obj1[key] !== obj2[key],
      getDiff: (key, obj1, obj2) => ({
        type: 'changed',
        key,
        newValue: obj2[key],
        oldValue: obj1[key],
      }),
    },
  ];

  const keys = _.union(_.keys(object1), _.keys(object2));
  return keys.map((key) => {
    const { getDiff } = handlers.find(({ check }) => check(key, object1, object2));
    return getDiff(key, object1, object2);
  });
};

export default buildDiff;
