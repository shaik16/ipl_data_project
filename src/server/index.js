const http = require('http');
const path = require('path');
const routes = require('./routes');
const iplStats = require('./ipl');

const csvFilePath = path.join(__dirname, '../data');

iplStats(csvFilePath)

const server = http.createServer(routes);

server.listen(3000, () => console.log(`server started on port ${server.address().port}`));
