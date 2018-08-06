const fs = require('fs');

const genDiff = (firstPath, secondPath) => {
  const jsonFirst = fs.readFileSync(firstPath);
  const jsonSecond = fs.readFileSync(secondPath);

  console.log(jsonFirst);
  console.log(jsonSecond);
};

export default genDiff;
