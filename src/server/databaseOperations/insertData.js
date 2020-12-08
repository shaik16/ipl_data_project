const createQuery = (connection, query, dataArray) => {
  return new Promise((resolve, reject) => {
    connection.query(query, dataArray, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = createQuery;
