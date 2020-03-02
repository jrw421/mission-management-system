/**
 * This function converts lb to KG and returns the value in the format
 * expected in the originally provided JSON.
 *
 * @param {Float} lb The number of pounds that should be converted to KG, represented
 * as a value with a decimal point.
 */
const lbToKG = (lb) => Math.round(lb / 2.2) + " kg";

/**
 * This function converts KG to lb and returns the value in the format
 * expected in the originally provided JSON.
 *
 * @param {Float} kg The number of pounds that should be converted to lb, represented
 * as a value with a decimal point.
 */
const kgToLb = (kg) => Math.round(kg * 2.2) + " lb";

/**
 * This function converts feet to CM and returns the value in the format
 * expected in the originally provided JSON.
 *
 * @param {Float} feet The number of feet that should be converted to CM, represented
 * as a value with a decimal point.
 */
const feetToCentimeters = (feet) => Math.round(feet * 30.48) + " cm";

/**
 * This function converts CM to feet and returns the value in the format
 * expected in the originally provided JSON.
 *
 * @param {Float} cm The number of centimetres that should be converted to CM, represented
 * as a value with a decimal point.
 */
const cmToFeet = (cm) => {
  const feetDecimal = cm / 30.48;
  const feetRemainder = feetDecimal % 1;
  const wholeFeet = feetDecimal - feetRemainder;
  return `${wholeFeet}'${Math.abs(Math.round(feetRemainder * 12))}`;
};

module.exports = {
  lbToKG,
  kgToLb,
  feetToCentimeters,
  cmToFeet,
};
