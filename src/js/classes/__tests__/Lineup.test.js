import editionAlphabeticalExceptHeadlinersMergeArtists from '../../../../tests/__mocks__/edition-alphabeticalExceptHeadliners-mergeArtists.json';
import editionAlphabeticalExceptHeadlinersNoMergeArtists from '../../../../tests/__mocks__/edition-alphabeticalExceptHeadliners-noMergeArtists.json';
import editionCustomOrderMergeArtists from '../../../../tests/__mocks__/edition-customOrder-mergeArtists.json';
import editionCustomOrderExceptHeadlinersMainByDaysAndMergeRest from '../../../../tests/__mocks__/edition-customOrderExceptHeadliners-mainByDaysAndMergeRest.json';
import editionNotSortedNoMergeArtists from '../../../../tests/__mocks__/edition-notSort-noMergeArtists.json';
import Lineup from '../Lineup';

describe('tests lineup class ', () => {
  describe('test returns of basic getters from class', () => {
    // having
    const lineup = new Lineup(editionNotSortedNoMergeArtists);

    it('return edition year', () => {
      // when
      const year = lineup.editionYear;

      // then
      expect(year).toBe('2013');
    });
    it('return merge artist type', () => {
      // when
      const mergeType = lineup.mergeArtistsType;

      // then
      expect(mergeType).toBeFalsy();
    });
    it('return other artists', () => {
      // when
      const other = lineup.otherArtists;

      // then
      expect(other).toBe('... and many others');
    });
  });
  describe('test returned lineup', () => {
    it('sort: alphabeticalExceptHeadliners and merge: true', () => {
      // having
      const mockedLineup = new Lineup(editionAlphabeticalExceptHeadlinersMergeArtists);

      // when
      const preparedLineup = mockedLineup.lineup;

      // then
      expect(preparedLineup).toMatchSnapshot();
    });
    it('sort: alphabeticalExceptHeadliners and merge: false', () => {
      // having
      const mockedLineup = new Lineup(editionAlphabeticalExceptHeadlinersNoMergeArtists);

      // when
      const preparedLineup = mockedLineup.lineup;

      // then
      expect(preparedLineup).toMatchSnapshot();
    });
    it('sort: customOrder and merge: true', () => {
      // having
      const mockedLineup = new Lineup(editionCustomOrderMergeArtists);

      // when
      const preparedLineup = mockedLineup.lineup;

      // then
      expect(preparedLineup).toMatchSnapshot();
    });
    it('sort: customOrderExceptHeadliners and merge: mainByDaysAndMergeRest', () => {
      // having
      const mockedLineup = new Lineup(editionCustomOrderExceptHeadlinersMainByDaysAndMergeRest);

      // when
      const preparedLineup = mockedLineup.lineup;

      // then
      expect(preparedLineup).toMatchSnapshot();
    });
    it('sort: false and merge: false', () => {
      // having
      const mockedLineup = new Lineup(editionNotSortedNoMergeArtists);

      // when
      const preparedLineup = mockedLineup.lineup;

      // then
      expect(preparedLineup).toMatchSnapshot();
    });
  });
});
