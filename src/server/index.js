const http = require('http');
const path = require('path');
const routes = require('./routes');
const iplStats = require('./ipl');
const env = require('./config');

const csvFilePath = path.join(__dirname, '../data');

const loadData = async () => {
    try{
        await iplStats(csvFilePath);

        const server = http.createServer(routes);

        server.listen(env.port, () =>
          console.log(`server started on port ${server.address().port}`)
        );
    }catch(err){
        console.log('Data loading Unsuccessful');
        console.log(err);
    }
};

loadData();


