const { feetToCentimeters, cmToFeet, lbToKG, kgToLb } = require('../JSONUtilities/JSONCleanerHelpers.js')

test('Converts Feet to Centimeters Correctly', () => {
    expect(feetToCentimeters(1)).toBe('30 cm');
    expect(feetToCentimeters(2)).toBe('61 cm');
    expect(feetToCentimeters(3)).toBe('91 cm');
    expect(feetToCentimeters(0)).toBe('0 cm');
    expect(feetToCentimeters(-1)).toBe('-30 cm');
});

test('Converts Centimeters to Feet Correctly', () => {
    expect(cmToFeet(100)).toBe('3\'3');
    expect(cmToFeet(200)).toBe('6\'7');
    expect(cmToFeet(300)).toBe('9\'10');
    expect(cmToFeet(0)).toBe('0\'0');
    expect(cmToFeet(-100)).toBe('-3\'3');
});

test('Converts LB to KG Correctly', () => {
    expect(lbToKG(100)).toBe('45 kg');
    expect(lbToKG(200)).toBe('91 kg');
    expect(lbToKG(300)).toBe('136 kg');
    expect(lbToKG(0)).toBe('0 kg');
    expect(lbToKG(-100)).toBe('-45 kg');
});

test('Converts KG to LB Correctly', () => {
    expect(kgToLb(100)).toBe('220 lb');
    expect(kgToLb(200)).toBe('440 lb');
    expect(kgToLb(300)).toBe('660 lb');
    expect(kgToLb(0)).toBe('0 lb');
    expect(kgToLb(-100)).toBe('-220 lb');
});