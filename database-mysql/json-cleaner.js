const fs = require('fs');
const path = require('path');

/**
 * This function will clean the corrupted JSON and provide a fresh parseable copy.
 * 
 * NOTE: This is a fit-for-purpose utility function that looks for a single pattern 
 * of corruption. Future work will extend this function for other edge cases.
 * 
 * @param {String} corruptJSON A String of characters representing corrupted JSON data.
 */
function cleanCorruptJSON(corruptJSON) {
    // Loop through the JSON data (used for loop for efficiency)
    for (let x = 0; x < corruptJSON.length -1; x++) {
        // Check for "}" where corruption pattern might have occurred
        if (corruptJSON[x] === "}") {
            // Traverse backwards through the string until we encounter a character
            var check = 1
            while(true) {
                let adjustedIndex = x - check
                // If the character represents the corruption pattern, fix it and stop search
                if (corruptJSON[adjustedIndex] === ",") {
                    corruptJSON = corruptJSON.slice(0, adjustedIndex) + corruptJSON.slice(adjustedIndex + 1)
                    break
                // If the character is a space or a new line, keep searching
                } else if (corruptJSON[x - check] == " " || corruptJSON[x - check] == "\n") {
                    check++
                // If the character is valid, stop searching
                } else {
                    break
                }
            }
        }    
    }

    // Return the cleaned corruptJSON
    return corruptJSON
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

module.exports = {readAndCleanCorruptedJSON};