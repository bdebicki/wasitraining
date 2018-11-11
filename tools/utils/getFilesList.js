const fs = require('fs');
const path = require('path');

module.exports = function getFilesList(filesPath) {
  return fs.readdirSync(filesPath).map(
    (fileName) => path.join(filesPath, fileName)
  );
};
