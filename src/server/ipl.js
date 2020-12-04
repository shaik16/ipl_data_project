const dbConnection = require('./databaseConnection');
const queryList = require('./queries');
const createQuery = require('./createQuery');

const iplStats = async (csvPath) => {
  try {
    const connection = await dbConnection.connect();
    await createQuery(connection, `SET GLOBAL local_infile='ON'`);
    const matchesExists = await createQuery(connection, queryList.matchesTableExist);
    const deliveriesExist = await createQuery(connection, queryList.deliveriesTableExist);
    if (deliveriesExist[0].Exist === 1) {
      await createQuery(connection, queryList.dropDeliveriesTable);
    }
    if (matchesExists[0].Exist === 1) {
      await createQuery(connection,queryList.dropMatchesTable)
    }
    await createQuery(connection, queryList.createMatchesTable);
    await createQuery(
      connection,
      `LOAD DATA
        LOCAL INFILE '${csvPath}/matches.csv'
        INTO TABLE matches
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
    );
    console.log('Matches data inserted successfully');

    await createQuery(connection, queryList.createDeliveriesTable);
    await createQuery(
      connection,
      `LOAD DATA
        LOCAL INFILE '${csvPath}/deliveries.csv'
        INTO TABLE deliveries
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
    );
    console.log('Deliveries data inserted successfully');

    connection.release()
  } catch (err) {
    console.error(err);
  }
};

module.exports = iplStats;
