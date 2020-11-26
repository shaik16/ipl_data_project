const fs = require('fs');
const path = require('path');
const csvToJson = require('./csvToJson');

const matchesPerYear = require('./ipl_stats/matchesPerYear');
const teamWonMatchesPerYear = require('./ipl_stats/teamWonMatchesPerYear');
const extraRunsConcededPerTeam = require('./ipl_stats/extraRunsConcededPerTeam');
const topTenEconomicBowlers = require('./ipl_stats/topTenEconomicBowlers');

const outputPath = path.join(__dirname, '../public/output');


const writeFile = (outputFilename, obj) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${outputPath}/${outputFilename}`, JSON.stringify(obj), (err) => {
      if (err) {
        reject(Error(`Error Occurred processing ${outputPath}/${outputFilename}`));
      }
      resolve(`${outputFilename} file Saved Successfully`);
    });
  });
};

const callFunctions = async (fileName, objCall, csvArray, year) => {
  try {
    if (year === undefined) {
      const statsFunction = objCall(...csvArray);
      const fileWrite = await writeFile(fileName, statsFunction);
      console.log(fileWrite);
    } else {
      const statsFunction = objCall(...csvArray, year);
      const fileWrite = await writeFile(fileName, statsFunction);
      console.log(fileWrite);
    }
  } catch (err) {
    console.error(err);
  }
};

const iplStats = async (csvPath) => {
  try{
      
      const matchesArray = await csvToJson(csvPath, 'matches.csv');
      const deliveriesArray = await csvToJson(csvPath, 'deliveries.csv');

      callFunctions('matchesPerYear.json', matchesPerYear, [matchesArray]);
      callFunctions('teamWonMatchesPerYear.json', teamWonMatchesPerYear, [matchesArray]);

      callFunctions(
        'extraRunsConcededPerTeam.json',
        extraRunsConcededPerTeam,
        [matchesArray, deliveriesArray],
        2016
      );
      callFunctions(
        'topTenEconomicBowlers.json',
        topTenEconomicBowlers,
        [matchesArray, deliveriesArray],
        2015
      );

  }catch(err){
    console.error(err);
  }
};

module.exports= iplStats;