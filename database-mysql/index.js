const mysql = require('mysql');
const { readAndCleanCorruptedJSON } = require('./JSONUtilityHelpers/JSONCleanerUtility.js');
const cleanedJsonData = readAndCleanCorruptedJSON('database-mysql/JSONUtilityHelpers/corrupt.json');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mission_management'
});


const loadData = (callback) => {
  cleanedJsonData.then(data => {
    connection.query('SELECT * FROM superhero_villian', function(err, results, fields) {
      let parsedData = JSON.parse(data)
      if (!results.length) {
        for (let i = 0; i < parsedData.length; i++) {
          let itemFields = [];
          let itemFieldsJoin = [];
          let item = parsedData[i];
          itemFields.push([item.name, item.slug]);
          itemFieldsJoin.push([item.name, item.slug, item.biography.alignment, item.images.lg, item])
          
          connection.query('INSERT INTO superhero_villian (name, slug, alignment, image, rawJSON) VALUES ?', ([itemFieldsJoin]), function(err, results, fields) {
            if(err) {
              callback(err, null);
            } else {
              callback(null, results);
            }
          });

          if (item.biography.alignment === "GOOD") {
            connection.query('INSERT INTO superhero (name, slug) VALUES ?', ([itemFields]), function(err, results, fields) {
              if(err) {
                callback(err, null);
              } else {
                callback(null, results);
              }
            });
          } else if (item.biography.alignment === ("BAD" || "neutral" || null)) { //assumming neutral and null are villians
            connection.query('INSERT INTO villian (name, slug) VALUES ?', ([itemFields]), function(err, results, fields) {
              if(err) {
                callback(err, null);
              } else {
                callback(null, results);
              }
            });
          }
        }
      }
    })
  })
  .catch(err => {
    console.log('error in cleaning data: ', err);
  })
}
;

const selectAll = (callback) => {
  connection.query('SELECT * FROM superhero_villian', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      console.log('results ', results)
      callback(null, results);
    }
  });
};

const selectHeroById = (id, callback) => {
  connection.query('SELECT * FROM superhero_villian where id = ?', id, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      console.log('results in hero by id ', results)
      callback(null, results);
    }
  });
}

module.exports = {selectAll, loadData, selectHeroById};
