import editionData, { lineupSettings } from '../../../../tests/__mocks__/edition-alphabeticalExceptHeadliners-noMergeArtists.json';
import rawLineup from '../../../../tests/__mocks__/rawLineup.json';
import AbstractLineup from '../AbstractLineup';

describe('test returns data from abstract lineup class', () => {
  // having
  const mockedAbstractLineup = new AbstractLineup(editionData);

  it('return settings from edition data', () => {
    // when
    const { settings } = mockedAbstractLineup;

    // then
    expect(settings).toEqual(lineupSettings);
  });

  it('return information does edition has separator', () => {
    // when
    const separator = mockedAbstractLineup.separatorElement;

    // then
    expect(separator).toBeFalsy();
  });

  it('return sort type', () => {
    // when
    const sort = mockedAbstractLineup.sortType;

    // then
    expect(sort).toBe('alphabeticalExceptHeadliners');
  });

  it('return raw data', () => {
    // when
    const lineup = mockedAbstractLineup.rawLineup;

    // then
    expect(lineup).toEqual(rawLineup);
  });
});
