const { loadData } = require('../database-mysql');

loadData((err, data) => {
  if (err) {
    console.log('There was an error loading the data. Please try again.');
  } else {
    console.log('Data loaded into the DB successfully.');
  }
});
