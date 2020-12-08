const dbConnection = require('./databaseOperations/databaseConnection');
const queryList = require('./databaseOperations/queries');
const createQuery = require('./databaseOperations/createQuery');
const insertData = require('./databaseOperations/insertData');
const csvToJson = require('./csvToJson');
const env = require('./config');

const iplStats = async (csvPath) => {
  try {
    const matchesArray = await csvToJson(csvPath, 'matches.csv');
    const deliveriesArray = await csvToJson(csvPath, 'deliveries.csv');


    const connection = await dbConnection.connect();


    const matchesExists = await createQuery(connection, queryList.tableExistQuery('matches',env.DB));
    const deliveriesExist = await createQuery(connection, queryList.tableExistQuery('deliveries',env.DB));


    if (deliveriesExist[0].Exist !== 1) {
      await createQuery(connection, queryList.createMatchesTable);
      const matchesData = matchesArray.map((obj) => {
        return Object.values(obj);
      });
      await insertData(connection, queryList.insertQuery('matches'), [matchesData]);
      console.log('Matches data inserted successfully');
    }

    if (matchesExists[0].Exist !== 1) {
      await createQuery(connection, queryList.createDeliveriesTable);
      const deliveriesData = deliveriesArray.map((obj) => {
        return Object.values(obj);
      });
      await insertData(connection, queryList.insertQuery('deliveries'), [deliveriesData]);
      console.log('Deliveries data inserted successfully');
    }

    connection.release();
  } catch (err) {
    console.error(err);
  }
};

module.exports = iplStats;
