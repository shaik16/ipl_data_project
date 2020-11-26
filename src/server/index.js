const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const matchesPerYear = require('./ipl_stats/matchesPerYear');
const teamWonMatchesPerYear = require('./ipl_stats/teamWonMatchesPerYear');
const extraRunsConcededPerTeam = require('./ipl_stats/extraRunsConcededPerTeam');
const topTenEconomicBowlers = require('./ipl_stats/topTenEconomicBowlers');

const csvFilePath = path.join(__dirname, '../data');
const outputPath = path.join(__dirname, '../public/output');

const writeFile = (outputFilename, obj) => {
  fs.writeFile(`${outputPath}/${outputFilename}`, JSON.stringify(obj), (err) => {
    if (err) {
      console.error(`Error Occurred processing ${outputPath}/${outputFilename}`);
    } else {
      console.log(`${outputFilename} file Saved Successfully`);
    }
  });
};

csv()
  .fromFile(`${csvFilePath}/matches.csv`)
  .then((matchesArray) => {
    csv()
      .fromFile(`${csvFilePath}/deliveries.csv`)
      .then((deliveriesArray) => {
        writeFile('matchesPerYear.json', matchesPerYear(matchesArray));
        writeFile('teamWonMatchesPerYear.json', teamWonMatchesPerYear(matchesArray));

        writeFile(
          'extraRunsConcededPerTeam.json',
          extraRunsConcededPerTeam(matchesArray, deliveriesArray, 2016)
        );
        writeFile(
          'topTenEconomicBowlers.json',
          topTenEconomicBowlers(matchesArray, deliveriesArray, 2015)
        );
        
      })
      .catch((err) => {
        if (err) {
          console.error(Error('Error Occurred While Processing Deliveries csv file'));
        }
      });
  })
  .catch((err) => {
    if (err) {
      console.error(Error('Error Occurred While Processing Matches csv file'));
    }
  });
