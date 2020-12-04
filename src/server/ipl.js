const fs = require('fs');
const path = require('path');

// const topTenEconomicBowlers = require('./ipl_stats/topTenEconomicBowlers');

const outputPath = path.join(__dirname, '../public/output');
const dbConnection = require('./databaseConnection');
const queryList = require('./queries');
const createQuery = require('./createQuery');

const writeFile = (outputFilename, obj) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${outputPath}/${outputFilename}`, JSON.stringify(obj), (err) => {
      if (err) {
        reject(Error(`Error Occurred processing ${outputPath}/${outputFilename}`));
      }
      resolve(`${outputFilename} file Saved Successfully`);
    });
  });
};

const iplStats = async (csvPath) => {
  try {
    // const connection = await dbConnection.connect();
    // await createQuery(connection, `SET GLOBAL local_infile='ON'`);
    // const matchesExists = await createQuery(connection, queryList.matchesTableExist);
    // const deliveriesExist = await createQuery(connection, queryList.deliveriesTableExist);
    // if (deliveriesExist[0].Exist === 1) {
    //   await createQuery(connection, queryList.dropDeliveriesTable);
    // }
    // if (matchesExists[0].Exist === 1) {
    //   await createQuery(connection,queryList.dropMatchesTable)
    // }
    // await createQuery(connection, queryList.createMatchesTable);
    // await createQuery(
    //   connection,
    //   `LOAD DATA
    //     LOCAL INFILE '${csvPath}/matches.csv'
    //     INTO TABLE matches
    //     FIELDS TERMINATED BY ','
    //     LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
    // );
    // console.log('Matches data inserted successfully');

    // await createQuery(connection, queryList.createDeliveriesTable);
    // await createQuery(
    //   connection,
    //   `LOAD DATA
    //     LOCAL INFILE '${csvPath}/deliveries.csv'
    //     INTO TABLE deliveries
    //     FIELDS TERMINATED BY ','
    //     LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
    // );
    // console.log('Deliveries data inserted successfully');

    // const matchesPerYearObject = await matchesPerYear(connection);
    // const matchesPerYearObjectStatus = await writeFile('matchesPerYear.json', matchesPerYearObject);
    // console.log(matchesPerYearObjectStatus);

    // const teamWonMatchesPerYearObject = await teamWonMatchesPerYear(connection);
    // const teamWonMatchesPerYearObjectStatus = await writeFile(
    //   'teamWonMatchesPerYear.json',
    //   teamWonMatchesPerYearObject
    // );
    // console.log(teamWonMatchesPerYearObjectStatus);
    // dbConnection.pool.end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = iplStats;
