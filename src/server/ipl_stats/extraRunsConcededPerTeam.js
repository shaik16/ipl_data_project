const queryList = require('../databaseOperations/queries');
const createQuery = require('../databaseOperations/createQuery');

const extraRunsConcededPerTeam = (connection, year) => {
  return new Promise((resolve, reject) => {
    createQuery(
      connection,
      queryList.selectExtraRunsConcededPerTeamQuery('matches', 'deliveries', year)
    )
      .then((data) => {
        const extraRunsConcededPerTeamPerTeamObject = data.reduce((acc, obj) => {
          if (acc[obj.season] === undefined) {
            acc[obj.season] = {};
          }
          acc[obj.season][obj.team] = obj.runs;

          return acc;
        }, {});

        return resolve(extraRunsConcededPerTeamPerTeamObject);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = extraRunsConcededPerTeam;
