const queryList = require('../queries');
const createQuery = require('../createQuery');

const extraRunsConcededPerTeam = (connection) => {
  return new Promise((resolve, reject) => {
    createQuery(connection, queryList.selectExtraRunsConcededPerTeam)
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
