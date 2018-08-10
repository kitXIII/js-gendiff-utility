import _ from 'lodash';

const space = '  ';

const renderDiff = (node, depth = 0) => {
  const result = array.reduce((acc, node) => {
    const { render } = _.find(renders, ({ check }) => check(node));
    return `${acc}${render(node, depth, renderDiff)}\n`;
  }, '');
  return `{\n${result}${closingBraceIndentStr(depth)}}`;
};

export default renderDiff;
