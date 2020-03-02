/* eslint-disable no-plusplus */
const mysql = require('mysql');
const { readAndCleanCorruptedJSON } = require('./JSONUtilityHelpers/JSONCleanerUtility.js');

const cleanedJsonData = readAndCleanCorruptedJSON('database-mysql/JSONUtilityHelpers/corrupt.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mission_management',
});

const persistDataOrLogError = (callback) => (err, results) => {
  if (err) {
    callback(err, null);
  } else {
    callback(null, results);
  }
};

const loadData = (callback) => {
  cleanedJsonData.then((data) => {
    connection.query('SELECT * FROM superhero_villian', (err, results) => {
      if (results && !results.length) {
        for (let i = 0; i < data.length; i++) {
          const itemFields = [];
          const itemFieldsJoin = [];
          const itemFieldsPowerStats = [];
          const item = data[i];
          itemFields.push([item.name, item.slug]);
          itemFieldsJoin.push(
            [item.name, item.slug, item.biography.alignment, item.images.lg, JSON.stringify(item)],
          );
          itemFieldsPowerStats.push([item.powerstats.intelligence, item.powerstats.strength, item.powerstats.speed, item.powerstats.durability, item.powerstats.power, item.powerstats.combat]);
          connection.query('INSERT INTO superhero_villian (name, slug, alignment, image, rawJSON) VALUES ?', ([itemFieldsJoin]), persistDataOrLogError(callback));
          if (item.biography.alignment === 'GOOD') {
            // connection.query('INSERT INTO superhero (name, slug) VALUES ?', ([itemFields]), persistDataOrLogError(callback));
            connection.query('INSERT INTO superhero_powerstats (intelligence, strength, speed, durability, power, combat) VALUES ?', ([itemFieldsPowerStats]), persistDataOrLogError(callback));
          } else { // assumming neutral and null are villians
            // connection.query('INSERT INTO villian (name, srslug) VALUES ?', ([itemFields]), persistDataOrLogError(callback));
            connection.query('INSERT INTO villian_powerstats (intelligence, strength, speed, durability, power, combat) VALUES ?', ([itemFieldsPowerStats]), persistDataOrLogError(callback));
          }
        }
      }
    });
  }).catch((err) => {
    console.log('error in cleaning data: ', err);
  });
};

const selectAll = (callback) => {
  connection.query('SELECT * FROM superhero_villian', persistDataOrLogError(callback));
};

const selectHeroById = (id, callback) => {
  connection.query('SELECT * FROM superhero_villian where id = ?', id, persistDataOrLogError(callback));
};

const selectHeroStatsById = (id, callback) => {
  connection.query('SELECT * FROM superhero_powerstats where superhero_id = ?', id, persistDataOrLogError(callback));
};

const selectVillianStatsById = (id, callback) => {
  connection.query('SELECT * FROM villian_powerstats where villian_id = ?', id, persistDataOrLogError(callback));
};

module.exports = {
  selectAll,
  loadData,
  selectHeroById,
  selectHeroStatsById,
  selectVillianStatsById
};
