import cleanDOM from '../../../../../tests/utils/cleanDOM';
import rainyEdition from '../../../../../tests/__mocks__/edition-notSort-noMergeArtists.json';
import newRainyEdition from '../../../../../tests/__mocks__/edition-notSort-customLevels.json';
import sunnyEdition from '../../../../../tests/__mocks__/edition-customOrderExceptHeadliners-mainByDaysAndMergeRest.json';
import BG from '../../background/elementHandlers/background';
import RAIN from '../elementHandlers/rain';
import LINK from '../../../elementHandlers/link';
import DIALOGBOX from '../../../utils/elementHandlers/dialogbox';
import RAIN_INFO_MASK_TYPES from '../../../enums/rainInfoMask';
import RainDetails from '../RainDetails';
import BgCover from '../../background/BgCover';

function prepareDOM(edition) {
	const rainDetails = new RainDetails(edition);

	document.body.appendChild(rainDetails.render());
}

function prepareBgMask(edition) {
	const rainDetails = new RainDetails(edition);

	document.body.appendChild(BgCover.render());
	rainDetails.decorateBgCoverByRainMask();
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
	describe('decorate rain mask', () => {
		afterEach(() => cleanDOM());

		it('decorate bg cover by yes mask', () => {
			prepareDOM(rainyEdition);
			prepareBgMask(rainyEdition);

			const maskId = document.querySelector(`.${BG.COVER_SHAPE_CLASS}`).getAttributeNS(null, 'mask');

			expect(maskId).toBe(`url(#${RAIN_INFO_MASK_TYPES.TRUE})`);
		});
		it('decorate bg cover by no mask', () => {
			prepareDOM(sunnyEdition);
			prepareBgMask(sunnyEdition);

			const maskId = document.querySelector(`.${BG.COVER_SHAPE_CLASS}`).getAttributeNS(null, 'mask');

			expect(maskId).toBe(`url(#${RAIN_INFO_MASK_TYPES.FALSE})`);
		});
	});
	describe('update rain mask', () => {
		it('update bg cover mask to yes', () => {

		});
		it('update bg cover mask to no', () => {

		});
		it('do not update mask in case of same mask type', () => {

		});
	});
	describe('update mask position', () => {
		it('update mask position', () => {

		});
	});
});
