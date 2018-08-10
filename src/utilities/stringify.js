import _ from 'lodash';

const stringify = (obj, depth = 0, space = '  ') => {
  if (!(obj instanceof Object)) {
    return `${obj}`;
  }

  const result = _.keys(obj).reduce((acc, key) => {
    const val = stringify(obj[key], depth + 1, space);
    return `${acc}${space.repeat(depth * 2 + 2)}${key}: ${val}\n`;
  }, '');
  return `{\n${result}${space.repeat(depth * 2)}}`;
};

export default stringify;
