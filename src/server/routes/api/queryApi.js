const express = require('express');

const dbConnection = require('../../databaseOperations/databaseConnection');
const matchesPerYear = require('../../ipl_stats/matchesPerYear');
const teamWonMatchesPerYear = require('../../ipl_stats/teamWonMatchesPerYear');
const extraRunsConcededPerTeam = require('../../ipl_stats/extraRunsConcededPerTeam');
const topTenEconomicBowlers = require('../../ipl_stats/topTenEconomicBowlers');

const route = express.Router();

route.get('/', (req, res) => {
  res.status(400).json({
    message:
      'append /api url  with matchesPerYear, teamWonPerYear, extraRunsPerTeam, and topTenEconomicBowlers',
  });
});

const databaseSession = async (res, queryCallBack, year) => {
  try {
    const connection = await dbConnection.connect();
    if (year === undefined) {
      const result = await queryCallBack(connection);
      res.json(result);
    } else {
      const result = await queryCallBack(connection, year);
      res.json(result);
    }
    connection.release();
  } catch (err) {
    console.log(err);
  }
};

route.get('/matchesPerYear', (req, res) => {
  databaseSession(res, matchesPerYear);
});

route.get('/teamWonPerYear', async (req, res) => {
  databaseSession(res, teamWonMatchesPerYear);
});

route.get('/extraRunsPerTeam', async (req, res) => {
  databaseSession(res, extraRunsConcededPerTeam, 2016);
});

route.get('/topTenEconomicBowlers', async (req, res) => {
  databaseSession(res, topTenEconomicBowlers, 2015);
});

route.get('/*', (req, res) => {
  res.status(400).json({
    message: 'Append api with proper string matchesPerYear or teamWonPerYear etc',
  });
});

module.exports = route;
