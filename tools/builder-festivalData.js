const fs = require('fs');
const path = require('path');
const getFestivalsDataList = require('./utils/getFilesList');
const getDataFromFiles = require('./utils/getDataFromFiles');

const sourceFilesPath = path.join(__dirname, '../src/data/festivals');
const dataFile = path.join(__dirname, '../public/festivalEditions.json');

const festivalsDataList = getFestivalsDataList(sourceFilesPath);
const dataFromFiles = getDataFromFiles(festivalsDataList);

fs.writeFileSync(dataFile, JSON.stringify(dataFromFiles, null, '\t'), 'utf-8');
console.log('festival data has been build');
