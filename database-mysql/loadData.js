const { loadData } = require('../database-mysql');

loadData((err) => {
  if (err) {
    console.log('There was an error loading the data. Please try again.');
  }
});
