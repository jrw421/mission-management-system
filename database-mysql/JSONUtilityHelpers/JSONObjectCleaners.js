const { feetToCentimeters, cmToFeet, lbToKG, kgToLb } = require('./JSONCleanerHelpers.js');

/**
 * A constant value that will indicate replaced corrupt data.
 */
const UNKNOWN = "UNKNOWN";

/**
 * This function assigns an ID to a hero if non exists or the value is invalid.
 * IDs are assigned starting at 1000 to ensure they do not conflict with the values
 * of existing heros. 
 * 
 * Note: A more reliable method of providing UniqueIdentifiers should be considered.
 * A local value is not ideal but will suffice for now.
 */

var ID = 1000
function cleanId(hero) {
    if (!hero.id || hero.id == "-") {
        hero.id = ID++
    }
}

/**
 * This function will attempt to parse a heros name from the provided slug if 
 * the original name is found to be missing or invalid. It will also fix the capitalization
 * of an existing name if necessary.
 */
const cleanName = (hero) => {
    if (hero.name === UNKNOWN) {
        if (hero.slug !== UNKNOWN) {
            const nameValues = hero.slug.split('-')
            // Note this could probably be done more efficiently but time is of the essence! 
            hero.name = nameValues
                            .slice(1)
                            .map(ele => ele.charAt(0)
                            .toUpperCase() + ele.slice(1))
                            .join(" ")
        }
    } else {
        const nameParts = hero.name.split(' ')
        const namePartsCapitalized = nameParts.map((ele) => ele.toUpperCase().slice(0,1) + ele.toLowerCase().slice(1))
        hero.name = namePartsCapitalized.join(' ')
    }
}

/**
 * This function checks that a slug exists, if not one is generated from the 
 * hero's name. If the name is unknown the ID will be used.
 * 
 * NOTE: This function is dependent on the execution of cleanName
 */
const cleanSlug = (hero) => {
    if (hero.slug == UNKNOWN) {
        if (hero.name != UNKNOWN) {
            hero.slug = (Math.round(Math.random() * 100)) + "-" + hero.name.toLowerCase().split(" ").join("-")
        } else {
            hero.slug = (Math.round(Math.random() * 100)) + "-" + "mystery" + '-' + hero.id 
        }
    }
}

/**
 * This is the baseline function for cleaning the provided JSON. Null values, empty values 
 * and "-" (which are the three type of empty values found in the corrupt data) 
 * are replaced with UNKNOWN.
 * 
 * Objects and arrays are explored recursively to find the corruption patterns.
 */
const recursiveCleanProperty = (object, property) => {
    if (typeof object[property] === "object" && object[property] !== null) {
        for (ele in object[property]) {
            recursiveCleanProperty(object[property], ele)
        }
    } else {
        if (!object[property] || object[property] == "-") {
            object[property] = UNKNOWN
        }
    }
}

const cleanGeneral = (hero) => {
    for (attribute in hero) {
        recursiveCleanProperty(hero, attribute)
    }
}

/**
 * This function cleans the data representing the appearance of a hero.
 */
const cleanAppearance = (hero) => {
    cleanGender(hero)
    cleanHeight(hero)
    cleanWeight(hero)
}

/**
 * This function checks that the weight of a given hero is valid. If either of the 
 * entries are valid, it will attempt to repair the other. If both entries are invalid
 * it will replace them both with UNKNOWN.
 */
const cleanGender = (hero) => {
    if (hero.appearance.gender !== UNKNOWN) {
        if (hero.appearance.gender.toUpperCase() === "M") {
            hero.appearance.gender = "MALE"
        } else if (hero.appearance.gender.toUpperCase() === "MALE") {
            hero.appearance.gender = "MALE"
        } else if (hero.appearance.gender.toUpperCase() === "FEMALE") {
            hero.appearance.gender = "FEMALE"
        } else if (hero.appearance.gender.toUpperCase() === "F") {
            hero.appearance.gender = "FEMALE"
        }
    }
}

/**
 * This function checks that the weight of a given hero is valid. If either of the 
 * entries are valid, it will attempt to repair the other. If both entries are invalid
 * it will replace them both with UNKNOWN.
 */
const cleanWeight = (hero) => {
    if (Array.isArray(hero.appearance.weight)) {
        weightValueStrings = hero.appearance.weight.map(ele => ele && ele !== "-" ? ele : UNKNOWN)
        if(weightValueStrings[0].split(' ').length !== 2) { weightValueStrings[0] = UNKNOWN}
        if(weightValueStrings[0].split(' ')[0] === '-') { weightValueStrings[0] = UNKNOWN}
        if(weightValueStrings[1].split(' ').length !== 2) { weightValueStrings[1] = UNKNOWN}
        if(weightValueStrings[1].split(' ')[0] === '-') { weightValueStrings[1] = UNKNOWN}
        
        if (weightValueStrings[0] === UNKNOWN && weightValueStrings[1] !== UNKNOWN) {
            let weightInKG = parseInt(weightValueStrings[1].split(" ")[0])
            hero.appearance.weight[0] = kgToLb(weightInKG)
        } else if (weightValueStrings[1] === UNKNOWN && weightValueStrings[0] !== UNKNOWN) {
            let weightInLb = parseInt(weightValueStrings[0].split(" ")[0])
            hero.appearance.weight[1] = lbToKG(weightInLb)
        } else if (weightValueStrings[1] === UNKNOWN && weightValueStrings[0] === UNKNOWN) {
            hero.appearance.weight = [UNKNOWN, UNKNOWN]
        }
    } else {
        hero.appearance.weight = [UNKNOWN, UNKNOWN]
    }
}

/**
 * This function checks that the height of a given hero is valid. If either of the 
 * entries are valid, it will attempt to repair the other. If both entries are invalid
 * it will replace them both with UNKNOWN.
 */
const cleanHeight = (hero) => {
    if (Array.isArray(hero.appearance.height)) {
        heightValueStrings = hero.appearance.height.map(ele => ele && ele !== "-" ? ele : UNKNOWN)
        if (heightValueStrings[0] === UNKNOWN && heightValueStrings[1] !== UNKNOWN) {
            let heightInCM = parseInt(heightValueStrings[1].split(" ")[0])
            hero.appearance.height[0] = cmToFeet(heightInCM)
        } else if (heightValueStrings[1] === UNKNOWN && heightValueStrings[0] !== UNKNOWN) {
            let heightStringInFeet = heightValueStrings[0].split('\'')
            let heightInFeet = parseInt(heightStringInFeet[0]) + parseFloat(heightStringInFeet[1] / 12)
            hero.appearance.height[1] = feetToCentimeters(heightInFeet)
        } else if (heightValueStrings[1] === UNKNOWN && heightValueStrings[0] === UNKNOWN) {
            hero.appearance.height = [UNKNOWN, UNKNOWN]
        }
    } else {
        hero.appearance.height = [UNKNOWN, UNKNOWN]
    }
}

const cleanAlignment = (hero) => {
    if (hero.biography.alignment !== UNKNOWN) {
        if (hero.biography.alignment.toUpperCase() === "GOOD") {
            hero.biography.alignment = "GOOD"
        } else if (hero.biography.alignment.toUpperCase() === "BAD") {
            hero.biography.alignment = "BAD"
        } else if (hero.biography.alignment.toUpperCase() === "NEUTRAL") {
            hero.biography.alignment = "NEUTRAL"
        }
    }
}

module.exports = { 
    cleanGeneral,
    cleanId, 
    cleanName, 
    cleanSlug, 
    cleanAppearance,
    cleanAlignment
}

