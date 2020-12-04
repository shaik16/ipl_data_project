const queryList = require('../queries');
const createQuery = require('../createQuery');

const matchesPerYear = (connection) => {
  return new Promise((resolve, reject) => {
    createQuery(connection, queryList.selectMatchesPerYear)
      .then((data) => {
        const matchesPerYearObject = data.reduce((acc, obj) => {
          acc[obj.season] = obj.matches;
          return acc;
        }, {});
        return resolve(matchesPerYearObject);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = matchesPerYear;
