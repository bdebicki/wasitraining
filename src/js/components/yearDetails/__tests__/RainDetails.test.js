import rainyEdition from '../../../../../tests/__mocks__/edition-notSort-noMergeArtists.json';
import newRainyEdition from '../../../../../tests/__mocks__/edition-notSort-customLevels.json';
import sunnyEdition from '../../../../../tests/__mocks__/edition-customOrderExceptHeadliners-mainByDaysAndMergeRest.json';
import cleanDOM from '../../../../../tests/utils/cleanDOM';
import RainDetails from '../RainDetails';
import RAIN from '../elementHandlers/rain';
import LINK from '../../../elementHandlers/link';
import DIALOGBOX from '../../../utils/elementHandlers/dialogbox';

function prepareDOM(edition) {
	const rainDetails = new RainDetails(edition);
	document.body.appendChild(rainDetails.render());
}

describe('tests for RainDetails class', () => {
	afterAll(() => cleanDOM());

	describe('render rain details section', () => {
		afterEach(() => cleanDOM());

		it('renders rain details section for rainy edition', () => {
			// having
			const rainDetails = new RainDetails(rainyEdition);

			// then
			expect(rainDetails.render()).toMatchSnapshot();
		});

		it('renders rain details section for sunny edition', () => {
			// having
			const rainDetails = new RainDetails(sunnyEdition);

			// then
			expect(rainDetails.render()).toMatchSnapshot();
		});
	});
	describe('update rain details section', () => {
		afterEach(() => cleanDOM());

		it('uptade rain info', () => {
			// having
			prepareDOM(rainyEdition);
			const updatedRainDetails = new RainDetails(sunnyEdition);

			// when
			updatedRainDetails.updateRainInfo();

			// then
			expect(document.querySelector(`.${RAIN.INFO_CLASS}`)).toMatchSnapshot();
		});
		it('update rain day details: from rainy to sunny', () => {
			// having
			prepareDOM(rainyEdition);
			const updatedRainDetails = new RainDetails(sunnyEdition);

			// when
			updatedRainDetails.updateRainDayDetails();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID)).toBeFalsy();
		});
		it('update rain day details: from sunny to rainy', () => {
			// having
			prepareDOM(sunnyEdition);
			const updatedRainDetails = new RainDetails(rainyEdition);

			// when
			updatedRainDetails.updateRainDayDetails();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID)).toBeTruthy();
		});
		it('update rain day details: from rainy to rainy', () => {
			// having
			prepareDOM(rainyEdition);
			const updatedRainDetails = new RainDetails(newRainyEdition);

			// when
			updatedRainDetails.updateRainDayDetails();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID)).toMatchSnapshot();
		});
		it('update rain details', () => {
			// having
			prepareDOM(rainyEdition);
			const updatedRainDetails = new RainDetails(sunnyEdition);

			// when
			updatedRainDetails.updateRainDetails();

			expect(document.querySelector(`.${RAIN.INFO_YES_CLASS}`)).toBeFalsy();
			expect(document.getElementById(RAIN.DETAILS_ID)).toBeFalsy();
		});
	});
	describe('toggle details dialogbox', () => {
		beforeAll(() => prepareDOM(rainyEdition));

		it('show details dialogbox', () => {
			// when
			document.querySelector(`.${RAIN.HEADER_CLASS} .${LINK.BASIC_CLASS}`).click();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID).classList.contains(DIALOGBOX.VISIBLE_CLASS)).toBeTruthy();
		});
		it('hide details dialogbox', () => {
			// when
			document.querySelector(`.${RAIN.DETAILS_ID} .${DIALOGBOX.CLOSE_CLASS}`).click();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID).classList.contains(DIALOGBOX.VISIBLE_CLASS)).toBeFalsy();
		});
	});
});
