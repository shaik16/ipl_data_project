const fs = require('fs');
const path = require('path');

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

const routes = (req, res) => {
  const {url} = req;
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
    case '/api/matchesPerYear':
      response(`${publicPath}/output/matchesPerYear.json`, 'application/json', res);
      break;
    default:
      response(`${publicPath}/404.html`, 'text/html', res);
      break;
  }
};

module.exports = routes;
