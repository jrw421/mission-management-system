const fs = require('fs');
const path = require('path');
const stringCleaners = require('./JSONStringCleaners.js')
const jsonCleaners = require('./JSONObjectCleaners.js')

/**
 * This function will clean the corrupted JSON and provide a fresh parseable copy.
 * 
 * NOTE: This is a fit-for-purpose utility function that looks for a single pattern 
 * of corruption. Future work will extend this function for other edge cases.
 * 
 * @param {String} corruptJSON A String of characters representing corrupted JSON data.
 */
function cleanCorruptJSON(corruptJSONString) {

    // Use a callback to reference corruptJSONString in this function scope
    // so that we may update it if a corruption pattern is found.
    const updateJSONStringCallBack = (cleanedJSONString) => {
        corruptJSONString = cleanedJSONString
    }

    // Loop through the JSON data
    // Apply all identified data cleaning functions
    for (let i = 0; i < corruptJSONString.length -1; i++) {
        stringCleaners.fixCorruptingCommas(corruptJSONString, i, updateJSONStringCallBack)
    }

    // Use a callback to reference corruptJSON in this function scope
    // so that we may update it if a corruption pattern is found.
    let corruptJSONHeroes = JSON.parse(corruptJSONString)
    for (heroIndex in corruptJSONHeroes) {
        corruptHeroRecord = corruptJSONHeroes[heroIndex]
        jsonCleaners.cleanGeneral(corruptHeroRecord)
        jsonCleaners.cleanId(corruptHeroRecord)
        jsonCleaners.cleanName(corruptHeroRecord)
        jsonCleaners.cleanSlug(corruptHeroRecord)
        jsonCleaners.cleanAppearance(corruptHeroRecord)
    }

    // Return the cleaned corruptJSON
    return corruptJSONHeroes
}

/**
 * This function will read and subsequently clean JSON data so that it may be
 * parsed and used for other operations.
 * 
 * @param {String} fileName The name of the file containing the corrupted JSON.
 */
function readAndCleanCorruptedJSON(fileName) {
    // Read the corrupted JSON synchronously from the file system  
    const filePath = path.resolve(fileName)
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(cleanCorruptJSON(data.toString()))
            }
        });
    })
}