const csv = require('csvtojson');

const csvToJsonConverter = (csvPath, fileName) => {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(`${csvPath}/${fileName}`)
      .then((arrOfObjects) => {
        resolve(arrOfObjects);
      })
      .catch((err) => {
        if (err) {
          reject(err);
        }
      });
  });
};

module.exports = csvToJsonConverter;
