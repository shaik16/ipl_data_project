const mysql = require('mysql');
const env = require('./config');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: env.host,
  user: env.user,
  password: env.pass,
  database: env.DB,
});

const connect = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err,connection)=>{
        if(err){
            return reject(err)
        }
        console.log('Connection Established');
        resolve(connection)
    })
  });
};

module.exports = { 
    pool,
    connect
 };


