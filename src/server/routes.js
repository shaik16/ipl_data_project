const fs = require('fs');
const path = require('path');

const dbConnection = require('./databaseConnection');
const matchesPerYear = require('./ipl_stats/matchesPerYear');
const teamWonMatchesPerYear = require('./ipl_stats/teamWonMatchesPerYear');
const extraRunsConcededPerTeam = require('./ipl_stats/extraRunsConcededPerTeam');
const topTenEconomicBowlers = require('./ipl_stats/topTenEconomicBowlers');

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(Error(err));
      }
      resolve(data);
    });
  });
};

const response = async (filePath, mime, res) => {
  try {
    const data = await readFile(filePath);
    res.writeHeader(200, { 'Content-Type': mime });
    res.write(data);
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHeader(404, { 'Content-Type': 'text/html' });
    res.write(`<h1>File Not Found</h1>`);
    res.end();
  }
};

const publicPath = path.join(__dirname, '../public');

const routes = async (req, res) => {
  const { url } = req;
  switch (url) {
    case '/':
      response(`${publicPath}/index.html`, 'text/html', res);
      break;
    case '/style.css':
      response(`${publicPath}/style.css`, 'text/css', res);
      break;
    case '/charts/matchesPerYearChart.js':
      response(`${publicPath}/charts/matchesPerYearChart.js`, 'text/javascript', res);
      break;
    case '/charts/teamWonPerYearChart.js':
      response(`${publicPath}/charts/teamWonPerYearChart.js`, 'text/javascript', res);
      break;
    case '/charts/extraRunsConcededPerTeam.js':
      response(`${publicPath}/charts/extraRunsConcededPerTeam.js`, 'text/javascript', res);
      break;
    case '/charts/topTenEconomicBowlers.js':
      response(`${publicPath}/charts/topTenEconomicBowlers.js`, 'text/javascript', res);
      break;
    case '/api/matchesPerYear': {
      const connection = await dbConnection.connect();
      const result = await matchesPerYear(connection);
      res.writeHeader(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(result));
      connection.release();
      break;
    }
    case '/api/teamWonPerYear': {
      const connection = await dbConnection.connect();
      const result = await teamWonMatchesPerYear(connection);
      res.writeHeader(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(result));
      connection.release();
      break;
    }
    case '/api/extraRunsPerTeam': {
      const connection = await dbConnection.connect();
      const result = await extraRunsConcededPerTeam(connection, 2016);
      res.writeHeader(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(result));
      connection.release();
      break;
    }
    case '/api/topTenEconomicBowlers': {
      const connection = await dbConnection.connect();
      const result = await topTenEconomicBowlers(connection, 2015);
      res.writeHeader(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(result));
      connection.release();
      break;
    }
    default:
      response(`${publicPath}/404.html`, 'text/html', res);
      break;
  }
};

module.exports = routes;
