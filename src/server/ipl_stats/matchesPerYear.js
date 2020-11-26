const matchesPerYear = (matchesArray) => {
  const matchesPerYearObject = matchesArray.reduce((acc, obj) => {
    if (acc[obj.season] === undefined) {
      acc[obj.season] = 1;
    } else {
      acc[obj.season] += 1;
    }
    
    return acc;
  }, {});

  return matchesPerYearObject;
};

module.exports = matchesPerYear;
