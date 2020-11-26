const path = require('path');
const iplStats = require('./ipl');

const csvFilePath = path.join(__dirname, '../data');

iplStats(csvFilePath)

