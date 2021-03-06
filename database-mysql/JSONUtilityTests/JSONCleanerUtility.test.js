const { cleanCorruptJSON, readAndCleanCorruptedJSON } = require('../JSONUtilityHelpers/JSONCleanerUtility.js');

test('The CleanerUtility Handles all Edge Cases Identified', () => {
  // This part of the data is non-deterministic and tested elsewhere.
  const cleanedData = cleanCorruptJSON(veryCorruptJSONHero);
  cleanedData[0].slug = '18-adam-strange';
  expect(JSON.stringify(cleanedData)).toBe(fixedJSONHero);
});

test('The ReadAndClean utility is able to parse and return the corrupted data', () => {
     return readAndCleanCorruptedJSON('database-mysql/JSONUtilityHelpers/corrupt.json').then((data) => {
       expect(typeof data).toBe('object');
     }).catch((err) => {
       throw new Error(err);
    });
});

const veryCorruptJSONHero = `[{
    "id": 8,
    "name": "Adam STRANGE",
    "slug": "",
    "powerstats": {
        "intelligence": 69,
        "strength": 10,
        "speed": 33,
        "durability": 40,
        "power": 37,
        "combat": 50,
    },
    "appearance": {
        "gender": "male",
        "race": "Human",
        "height": [
            "6'1",
            "185 cm"
        ],
        "weight": [
            "195 lb",
            "kg"
        ],
        "eyeColor": "Blue",
        "hairColor": "Blond"
    },
    "biography": {
        "fullName": "Adam Strange",
        "alterEgos": "No alter egos found.",
        "aliases": [
            "Warrior of Two Worlds",
            ""
        ],
        "placeOfBirth": "Chicago, Illinois",
        "firstAppearance": "Outsiders #6 (April, 1986)",
        "publisher": "DC Comics",
        "alignment": "good"
    },
    "work": {
        "occupation": "Adventurer, archaelogist, ambassador",
        "base": "Rann, Alpha Centauri System"
    },
    "connections": {
        "groupAffiliation": "Omega Men, L.E.G.I.O.N., R.E.B.E.L.S., formerly Seven Soldiers of Victory",
        "relatives": "Alanna Strange (wife); Aleea Strange (daughter); Sardath (father-in-law); Janey Strange (sister); Todd Strange (brother, deceased); Bantteir (mother-in-law); Adam Strange II (descendent)"
    },
    "images": {
        "xs": "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/xs/8-adam-strange.jpg",
        "sm": "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/sm/8-adam-strange.jpg",
        "md": "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/md/8-adam-strange.jpg",
        "lg": "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/lg/8-adam-strange.jpg"
    }
}]`;

const fixedJSONHero = `[{"id":8,"name":"Adam Strange","slug":"18-adam-strange","powerstats":{"intelligence":69,"strength":10,"speed":33,"durability":40,"power":37,"combat":50},"appearance":{"gender":"MALE","race":"Human","height":["6'1","185 cm"],"weight":["195 lb","89 kg"],"eyeColor":"Blue","hairColor":"Blond"},"biography":{"fullName":"Adam Strange","alterEgos":"No alter egos found.","aliases":["Warrior of Two Worlds","UNKNOWN"],"placeOfBirth":"Chicago, Illinois","firstAppearance":"Outsiders #6 (April, 1986)","publisher":"DC Comics","alignment":"GOOD"},"work":{"occupation":"Adventurer, archaelogist, ambassador","base":"Rann, Alpha Centauri System"},"connections":{"groupAffiliation":"Omega Men, L.E.G.I.O.N., R.E.B.E.L.S., formerly Seven Soldiers of Victory","relatives":"Alanna Strange (wife); Aleea Strange (daughter); Sardath (father-in-law); Janey Strange (sister); Todd Strange (brother, deceased); Bantteir (mother-in-law); Adam Strange II (descendent)"},"images":{"xs":"https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/xs/8-adam-strange.jpg","sm":"https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/sm/8-adam-strange.jpg","md":"https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/md/8-adam-strange.jpg","lg":"https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/lg/8-adam-strange.jpg"}}]`;