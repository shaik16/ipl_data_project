const dbConnection = require('./databaseConnection');
const queryList = require('./queries');
const createQuery = require('./createQuery');

const iplStats = async (csvPath) => {
  try {
    const connection = await dbConnection.connect();

    await createQuery(connection, `SET GLOBAL local_infile='ON'`);

    const matchesExists = await createQuery(connection, queryList.tableExistQuery('matches'));
    const deliveriesExist = await createQuery(connection, queryList.tableExistQuery('deliveries'));

    if (deliveriesExist[0].Exist === 1) {
      await createQuery(connection, queryList.dropTableQuery('deliveries'));
    }
    if (matchesExists[0].Exist === 1) {
      await createQuery(connection, queryList.dropTableQuery('matches'));
    }

    await createQuery(connection, queryList.createMatchesTable);
    await createQuery(connection, queryList.insertData(csvPath, 'matches'));
    console.log('Matches data inserted successfully');

    await createQuery(connection, queryList.createDeliveriesTable);
    await createQuery(connection, queryList.insertData(csvPath, 'deliveries'));
    console.log('Deliveries data inserted successfully');

    connection.release();
  } catch (err) {
    console.error(err);
  }
};

module.exports = iplStats;
