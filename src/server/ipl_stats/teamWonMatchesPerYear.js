const teamWonMatchesPerYear = (matchesArray) => {
  const teamWonMatchesPerYearObject = matchesArray
  .reduce((acc, obj) => {
    if (acc[obj.season] === undefined) {
      acc[obj.season] = {};
    }

    if (acc[obj.season][obj.winner] === undefined) {
      acc[obj.season][obj.winner] = 1;
    } else {
      acc[obj.season][obj.winner] += 1;
    }

    return acc;
  }, {});

  return teamWonMatchesPerYearObject;
};

module.exports = teamWonMatchesPerYear;
