import cleanDOM from '../../../../../tests/utils/cleanDOM';
import editionOneDay from '../../../../../tests/__mocks__/editionOneDay.json';
import editionMultipleDays from '../../../../../tests/__mocks__/edition-notSort-noMergeArtists.json';
import editionNewEdition from '../../../../../tests/__mocks__/edition-notSort-customLevels.json';
import { EDITION } from '../elementHandlers/edition';
import EditionDetails from '../EditionDetails';

describe('yeaar details - edition details', () => {
	afterAll(() => cleanDOM());

	const details = new EditionDetails(editionMultipleDays);

	describe('return edition date', () => {
		it('return date for one day edition', () => {
			// when
			const oneDayDetails = new EditionDetails(editionOneDay);

			// then
			expect(oneDayDetails.decorateEditionDates()).toBe('2nd July');
		});

		it('return date for multiple days edition', () => {
			// then
			expect(details.decorateEditionDates()).toBe('3rd July - 6th July');
		});
	});

	describe('render code parts', () => {
		it('renders headliners section', () => {
			expect(details.renderHeadliners()).toMatchSnapshot();
		});

		it('renders edition details section', () => {
			expect(details.renderEditionDetails()).toMatchSnapshot();
		});

		it('renders composed edition details section', () => {
			expect(details.render()).toMatchSnapshot();
		});
	});

	describe('update actions', () => {
		// having
		document.body.appendChild(details.render());
		const newEdition = new EditionDetails(editionNewEdition);

		newEdition.updateEditionDetails();
		it('update edition details', () => {
			// when
			newEdition.updateEditionDetails();

			// then
			expect(document.getElementById(EDITION.EDITION_DETAILS_ID)).toMatchSnapshot();
		});
	});
});
