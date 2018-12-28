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
		expect(sortedHeadliners).toMatchSnapshot();
	});
	it('return headliners sorted by customOrder type', () => {
		// having
		const headliners = new Headliners(editionCustomOrder);

		// when
		const sortedHeadliners = headliners.headliners;

		// then
		expect(sortedHeadliners).toMatchSnapshot();
	});
	it('return headliners sorted by customOrderExceptHeadliners type', () => {
		// having
		const headliners = new Headliners(editionCustomOrderExceptHeadliners);

		// when
		const sortedHeadliners = headliners.headliners;

		// then
		expect(sortedHeadliners).toMatchSnapshot();
	});
	it('return headliners not sorted', () => {
		// having
		const headliners = new Headliners(editionNotSorted);

		// when
		const sortedHeadliners = headliners.headliners;

		// then
		expect(sortedHeadliners).toMatchSnapshot();
	});
});
