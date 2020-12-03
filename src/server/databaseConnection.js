const mysql = require('mysql');
const env = require('./config');

const connection = mysql.createConnection({
  host: env.host,
  user: env.user,
  password: env.pass,
  database: env.DB,
});

const connect = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting..');
        reject(err);
        return;
      }
      resolve('Connection Established');
    });
  });
};

module.exports = {
  connect,
  query: connection,
};


