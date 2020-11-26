const arrayOfMatchesId = require('./arrayOfMatchesId');

const topTenEconomicBowlers = (matchesArray, deliveriesArray, year) => {
  const arrayOfId = arrayOfMatchesId(year, matchesArray);

  const economicBowlersObject = deliveriesArray.reduce(
    (acc, obj) => {
      const runsStatus = obj.bye_runs == 0 && obj.legbye_runs == 0;
      const ballStatus = obj.wide_runs == 0 && obj.noball_runs == 0;

      if (arrayOfId.includes(obj.match_id)) {
        if (acc[year][obj.bowler] === undefined) {
          acc[year][obj.bowler] = { total_runs: 0, overs: 0, economy: 0 };
        }

        if (runsStatus === true) {
          acc[year][obj.bowler]['total_runs'] += Number(obj.total_runs);
        }
        if (ballStatus === true) {
          acc[year][obj.bowler]['overs'] += 1;
        }
      }

      return acc;
    },
    {
      [year]: {},
    }
  );

  const economyArrayOfAllBowlers = Object.keys(economicBowlersObject[year]).map((obj) => {
    const over = economicBowlersObject[year][obj]['overs'] * (10 / 6);

    economicBowlersObject[year][obj]['economy'] = (
      (economicBowlersObject[year][obj]['total_runs'] / over) *
      10
    ).toFixed(2);

    economicBowlersObject[year][obj]['overs'] =
      Math.floor(economicBowlersObject[year][obj]['overs'] / 6) +
      (economicBowlersObject[year][obj]['overs'] -
        Math.floor(economicBowlersObject[year][obj]['overs'] / 6) * 6) /
        10;

    return Number(economicBowlersObject[year][obj]['economy']);
  });

  const arrayOfTopTenEconomies = economyArrayOfAllBowlers.sort((a, b) => a - b).slice(0, 10);

  const topTenEconomicBowlersObject = Object.keys(economicBowlersObject[year]).reduce(
    (acc, obj) => {
      if (arrayOfTopTenEconomies.includes(Number(economicBowlersObject[year][obj]['economy']))) {
        acc[year][obj] = economicBowlersObject[year][obj];
        acc[year][obj]['economy'] = economicBowlersObject[year][obj]['economy'];
      }

      return acc;
    },
    {
      [year]: {},
    }
  );
  
  return topTenEconomicBowlersObject;
};

module.exports = topTenEconomicBowlers;
