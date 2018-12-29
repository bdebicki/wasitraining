import cleanDOM from '../../../../../tests/utils/cleanDOM';
import rainyEdition from '../../../../../tests/__mocks__/edition-notSort-noMergeArtists.json';
import sunnyEdition from '../../../../../tests/__mocks__/edition-customOrderExceptHeadliners-mainByDaysAndMergeRest.json';
import { EDITION } from '../elementHandlers/edition';
import RAIN from '../elementHandlers/rain';
import { LINEUP } from '../elementHandlers/lineup';
import YearDetails from '../YearDetails';

describe('check year details component', () => {
	afterAll(() => cleanDOM());

	it('renders year details', () => {
		// having
		const details = new YearDetails(rainyEdition);

		// when
		document.body.appendChild(details.render());

		// then
		expect(document.getElementById(EDITION.EDITION_DETAILS_ID)).toBeTruthy();
		expect(document.getElementById(RAIN.SECTION_ID)).toBeTruthy();
		expect(document.getElementById(LINEUP.SECTION_ID)).toBeTruthy();
	});

	it('check doeas update year details happen', () => {
		// having
		const updatedDetails = new YearDetails(sunnyEdition);

		// when
		updatedDetails.updateYearDetails();

		// then
		expect(document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent).toBe('2005');
		expect(document.querySelector(`.${RAIN.INFO_NO_CLASS}`)).toBeTruthy();
		expect(document.querySelector(`.${LINEUP.EDITION_CLASS}2005`)).toBeTruthy();
	});
});
