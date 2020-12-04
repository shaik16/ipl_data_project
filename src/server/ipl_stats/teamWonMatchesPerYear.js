const queryList = require('../queries');
const createQuery = require('../createQuery');

const teamWonMatchesPerYear = (connection) => {
  return new Promise((resolve, reject) => {
    createQuery(connection, queryList.selectTeamWonPerYear)
      .then((data) => {
        const teamWonMatchesPerYearObject = data.reduce((acc, obj) => {
          if (acc[obj.season] === undefined) {
            acc[obj.season] = {};
          }
          acc[obj.season][obj.team] = obj.wins;
          return acc;
        }, {});

        return resolve(teamWonMatchesPerYearObject);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = teamWonMatchesPerYear;
