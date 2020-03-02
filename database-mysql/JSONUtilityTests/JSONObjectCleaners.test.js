/* eslint-disable prefer-template */
const {
  cleanGeneral,
  cleanId,
  cleanName,
  cleanSlug,
  cleanAppearance,
  cleanAlignment,
} = require('../JSONUtilityHelpers/JSONObjectCleaners.js');

test('The cleanId function will create an ID if none exists', () => {
  const noIDHeroes = [{ id: null }, { id: '-' }, { id: '' }];
  const fixedIDHeroes = [{ id: 1000 }, { id: 1001 }, { id: 1002 }];
  noIDHeroes.map((hero) => cleanId(hero));
  expect(noIDHeroes).toStrictEqual(fixedIDHeroes);
});

test('The cleanName function will ensure names are capitalized consistently AND attempt to create if none exists', () => {
  const noNameHeroes = [{ name: 'BaLonEy Name' }, { name: 'UNKNOWN', slug: '46-test-name' }];
  const fixedNameHeroes = [{ name: 'Baloney Name' }, { name: 'Test Name', slug: '46-test-name' }];
  noNameHeroes.map((hero) => cleanName(hero));
  expect(noNameHeroes).toStrictEqual(fixedNameHeroes);
});

test('The clean slug function will attempt to create a slug if none exists', () => {
  const slugHeroes = [{ name: 'Super Man', slug: 'UNKNOWN' }, { id: 100, name: 'UNKNOWN', slug: 'UNKNOWN' }];
  const fixedSlugHeroes = [{ name: 'Super Man', slug: '42-super-man' }, { id: 100, name: 'UNKNOWN', slug: '42-mystery-100' }];
  slugHeroes.map((hero) => cleanSlug(hero));
  // Remove non-determinism from test
  slugHeroes[0].slug = '42-' + slugHeroes[0].slug.split('-').slice(1).join('-');
  slugHeroes[1].slug = '42-' + slugHeroes[1].slug.split('-').slice(1).join('-');
  expect(slugHeroes).toStrictEqual(fixedSlugHeroes);
});

test('The clean appearance function will fix missing heights and weights where possible and standardize gender data', () => {
  const appearanceTestHeroes = [
    {
      appearance: {
        height: ["6'3", 'UNKNOWN'],
        weight: ['UNKNOWN', '100 kg'],
        gender: 'mAle',
      },
    },
  ];
  const fixedAppearanceHeroes = [{ appearance: { height: ["6'3", '191 cm'], weight: ['220 lb', '100 kg'], gender: 'MALE' } }];
  appearanceTestHeroes.map((hero) => cleanAppearance(hero));
  expect(appearanceTestHeroes).toStrictEqual(fixedAppearanceHeroes);
});

test('The cleanAlignment function will ensure appropriate capitalization', () => {
  const alignmentTestHeroes = [
    { biography: { alignment: 'GooD' } },
    { biography: { alignment: 'BAd' } },
    { biography: { alignment: 'NeUtRal' } },
  ];
  const fixedAlignmentHeroes = [
    { biography: { alignment: 'GOOD' } },
    { biography: { alignment: 'BAD' } },
    { biography: { alignment: 'NEUTRAL' } },
  ];
  alignmentTestHeroes.map((hero) => cleanAlignment(hero));
  // eslint-disable-next-line no-undef
  expect(alignmentTestHeroes).toStrictEqual(fixedAlignmentHeroes);
});

test('The cleanGeneral function changes all appropriate values to unknown', () => {
  cleanGeneral(badData);
  expect(badData).toStrictEqual(cleanedData);
});

const badData = {
  test: [
    {
      deeperTest: [
        {
          evenDeeperTest: {
            badValue: '-',
            nullValue: null,
            emptyValue: '',
          },
        },
      ],
    },
  ],
};

const cleanedData = {
  test: [
    {
      deeperTest: [
        {
          evenDeeperTest: {
            badValue: 'UNKNOWN',
            nullValue: 'UNKNOWN',
            emptyValue: 'UNKNOWN',
          },
        },
      ],
    },
  ],
};
