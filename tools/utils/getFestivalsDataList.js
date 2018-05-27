const fs = require('fs');
const path = require('path');

const sourceFilesPath = path.join(__dirname, '../../src/data/festivals');

module.exports = function getFestivalsDataList() {
	return fs.readdirSync(sourceFilesPath).map(
		(fileName) => path.join(sourceFilesPath, fileName)
	);
};
