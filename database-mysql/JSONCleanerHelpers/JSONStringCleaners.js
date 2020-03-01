/**
 * This function will remove corrupting commas from otherwise valid JSON.
 * 
 * @param {String} stringJSON A string representing the corrupted JSON
 * @returns If the data is corrupted this function will return JSON with this pattern 
 * of corruption cleaned. Otherwise it will return false.
 */
function fixCorruptingCommas(stringJSON, index, callback) {
    // Check for "}" where corruption pattern might have occurred
    if (stringJSON[index] === "}") {
        // Traverse backwards through the stringJSON until we encounter a character
        var check = 1
        while(true) {
            let adjustedIndex = index - check
            // If the character represents the corruption pattern, fix it and stop search
            if (stringJSON[adjustedIndex] === ",") {
                callback(stringJSON.slice(0, adjustedIndex) + stringJSON.slice(adjustedIndex + 1))
                break
            // If the character is a space or a new line, keep searching
            } else if (stringJSON[index - check] == " " || stringJSON[index - check] == "\n") {
                check++
            // If the character is valid, stop searching
            } else {
                break
            }
        }
    }    
}

module.exports = { fixCorruptingCommas }