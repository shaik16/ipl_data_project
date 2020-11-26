const arrayOfMatchesId = (year, matchesArray) => {
  return matchesArray
    .filter((obj) => obj.season == year)
    .map((obj) => {
      return obj.id;
    });
};

module.exports = arrayOfMatchesId;
