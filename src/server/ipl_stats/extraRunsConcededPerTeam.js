const arrayOfMatchesId = require('./arrayOfMatchesId');

const extraRunsConcededPerTeam = (matchesArray, deliveriesArray, year) => {
  const arrayOfId = arrayOfMatchesId(year, matchesArray);

  const extraRunsConcededPerTeamPerTeamObject = deliveriesArray
  .reduce(
    (acc, obj) => {
      if (arrayOfId.includes(obj.match_id)) {
        if (acc[year][obj.bowling_team] === undefined) {
          acc[year][obj.bowling_team] = 0;
        } else {
          acc[year][obj.bowling_team] += Number(obj.extra_runs);
        }
      }

      return acc;
    },
    {
      [year]: {},
    }
  );

  return extraRunsConcededPerTeamPerTeamObject;
};

module.exports = extraRunsConcededPerTeam;
