const express = require('express');
const path = require('path');
const iplStats = require('./ipl');
const env = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./routes/api/queryApi'));

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
});

const csvFilePath = path.join(__dirname, '../data');

iplStats(csvFilePath);

app.listen( process.env.PORT || env.port, () => {
  console.log(`Server started on ${env.port}`);
});
