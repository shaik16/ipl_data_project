const queryList = require('../queries');
const createQuery = require('../createQuery');

const topTenEconomicBowlers = (connection, year) => {
  return new Promise((resolve, reject) => {
    createQuery(
      connection,
      queryList.selectTopTenEconomicBowlersQuery('matches', 'deliveries', year)
    )
      .then((data) => {
        const topTenEconomicBowlersObject = data.reduce((acc, obj) => {
          if (acc[obj.season] === undefined) {
            acc[obj.season] = {};
          }
          if (acc[obj.season][obj.bowler] === undefined) {
            acc[obj.season][obj.bowler] = {};
          }
          acc[obj.season][obj.bowler]['total_runs'] = obj.runs_conceded;
          acc[obj.season][obj.bowler]['overs'] = obj.overs;
          acc[obj.season][obj.bowler]['economy'] = obj.Economy;

          return acc;
        }, {});

        return resolve(topTenEconomicBowlersObject);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = topTenEconomicBowlers;
