import editionAlphabeticalExceptHeadliners from '../../../../tests/__mocks__/edition-alphabeticalExceptHeadliners-noMergeArtists.json';
import editionCustomOrder from '../../../../tests/__mocks__/edition-customOrder-mergeArtists.json';
import editionCustomOrderExceptHeadliners from '../../../../tests/__mocks__/edition-customOrderExceptHeadliners-mainByDaysAndMergeRest.json';
import editionNotSorted from '../../../../tests/__mocks__/edition-notSort-customLevels.json';
import Headliners from '../Headliners';

describe('tests headliners class', () => {
	it('return headliners sorted by alphabeticalExceptHeadliners type', () => {
		// having
		const headliners = new Headliners(editionAlphabeticalExceptHeadliners);

		// when
		const sortedHeadliners = headliners.headliners;

		// then
		const expectedHeadliners = ['Radiohead', 'Foo Fighters', 'The Weekend', 'The XX', 'Lorde'];
		expect(sortedHeadliners).toEqual(expectedHeadliners);
	});
	it('return headliners sorted by customOrder type', () => {
		// having
		const headliners = new Headliners(editionCustomOrder);

		// when
		const sortedHeadliners = headliners.headliners;

		// then
		const expectedHeadliners = ['Björk', 'Beastie Boys', 'Muse'];
		expect(sortedHeadliners).toEqual(expectedHeadliners);
	});
	it('return headliners sorted by customOrderExceptHeadliners type', () => {
		// having
		const headliners = new Headliners(editionCustomOrderExceptHeadliners);

		// when
		const sortedHeadliners = headliners.headliners;

		// then
		const expectedHeadliners = [
			'Snoop Dogg',
			'Fatboy Slim',
			'Faithless',
			'The White Stripes',
			'Lauryn Hill',
			'Underworld',
		];
		expect(sortedHeadliners).toEqual(expectedHeadliners);
	});
	it('return headliners not sorted', () => {
		// having
		const headliners = new Headliners(editionNotSorted);

		// when
		const sortedHeadliners = headliners.headliners;

		// then
		const expectedHeadliners = ['Pink', 'Cypress Hill', 'Massive Attack', 'Goldfrapp'];
		expect(sortedHeadliners).toEqual(expectedHeadliners);
	});
});
