const { fixCorruptingCommas } = require('../JSONUtilityHelpers/JSONStringCleaners.js');

test('The fix corrupting commas function will fix any JSON with erroneous commas preventing successful parsing', () => {
  let crazyJSON = '[{"id": 8,"name": "Adam STRANGE","slug": "","powerstats": {"intelligence": 69,"strength": 10,"speed": 33,},},]';

  const updateJSONStringCallBack = (cleanedJSONString) => {
    crazyJSON = cleanedJSONString;
  };

  for (let x = 0; x < crazyJSON.length; x++) {
    fixCorruptingCommas(crazyJSON, x, updateJSONStringCallBack);
  }
  expect(crazyJSON).toBe(fixedJSON);
  expect(typeof JSON.parse(fixedJSON)).toBe('object');
});

const fixedJSON = '[{"id": 8,"name": "Adam STRANGE","slug": "","powerstats": {"intelligence": 69,"strength": 10,"speed": 33}}]';
