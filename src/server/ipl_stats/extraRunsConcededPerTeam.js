const extraRunsConcededPerTeam = (matchesArray, deliveriesArray, year) => {
  const matchesID = matchesArray
    .filter((obj) => obj.season == year)
    .map((obj) => {
      return obj.id;
    });

  const extraRunsConcededPerTeamPerTeamObject = deliveriesArray
  .reduce(
    (acc, obj) => {
      if (matchesID.includes(obj.match_id)) {
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
