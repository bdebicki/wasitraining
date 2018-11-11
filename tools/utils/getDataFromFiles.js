module.exports = function getDataFromFiles(list) {
  return list.map((file) => require(file)); // eslint-disable-line import/no-dynamic-require, global-require
};
