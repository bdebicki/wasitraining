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

function mockRainDetails(edition) {
	const rainDetails = new RainDetails(edition);

	document.body.appendChild(rainDetails.render());
}

function mockBgMask(edition) {
	const rainDetails = new RainDetails(edition);

	document.body.appendChild(BgCover.render());
	rainDetails.decorateBgCoverByRainMask();
}

function mockEdition(edition) {
	mockRainDetails(edition);
	mockBgMask(edition);
}

function mockRainMaskPosition() {
	document.querySelector(`.${RAIN.INFO_CLASS}`).getBoundingClientRect = jest.fn(() => ({
		left: 100,
		bottom: 100,
	}));
}

function getMaskId() {
	return document.querySelector(`.${BG.COVER_SHAPE_CLASS}`).getAttributeNS(null, 'mask');
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
			mockRainDetails(rainyEdition);
			const updatedRainDetails = new RainDetails(sunnyEdition);

			// when
			updatedRainDetails.updateRainInfo();

			// then
			expect(document.querySelector(`.${RAIN.INFO_CLASS}`)).toMatchSnapshot();
		});
		it('update rain day details: from rainy to sunny', () => {
			// having
			mockRainDetails(rainyEdition);
			const updatedRainDetails = new RainDetails(sunnyEdition);

			// when
			updatedRainDetails.updateRainDayDetails();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID)).toBeFalsy();
		});
		it('update rain day details: from sunny to rainy', () => {
			// having
			mockRainDetails(sunnyEdition);
			const updatedRainDetails = new RainDetails(rainyEdition);

			// when
			updatedRainDetails.updateRainDayDetails();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID)).toBeTruthy();
		});
		it('update rain day details: from rainy to rainy', () => {
			// having
			mockRainDetails(rainyEdition);
			const updatedRainDetails = new RainDetails(newRainyEdition);

			// when
			updatedRainDetails.updateRainDayDetails();

			// then
			expect(document.getElementById(RAIN.DETAILS_ID)).toMatchSnapshot();
		});
		it('update rain details', () => {
			// having
			mockRainDetails(rainyEdition);
			const updatedRainDetails = new RainDetails(sunnyEdition);

			// when
			updatedRainDetails.updateRainDetails();

			expect(document.querySelector(`.${RAIN.INFO_YES_CLASS}`)).toBeFalsy();
			expect(document.getElementById(RAIN.DETAILS_ID)).toBeFalsy();
		});
	});
	describe('toggle details dialogbox', () => {
		beforeAll(() => mockRainDetails(rainyEdition));

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
			// when
			mockEdition(rainyEdition);

			// then
			expect(getMaskId()).toBe(`url(#${RAIN_INFO_MASK_TYPES.TRUE})`);
		});
		it('decorate bg cover by no mask', () => {
			// when
			mockEdition(sunnyEdition);

			// then
			expect(getMaskId()).toBe(`url(#${RAIN_INFO_MASK_TYPES.FALSE})`);
		});
	});
	describe('update rain mask', () => {
		afterEach(() => cleanDOM());

		it('update bg cover mask to yes', () => {
			// having
			mockEdition(sunnyEdition);

			// when
			const newEditionRainDetails = new RainDetails(rainyEdition);
			newEditionRainDetails.updateBgCoverByRainMask();

			// then
			expect(getMaskId()).toBe(`url(#${RAIN_INFO_MASK_TYPES.TRUE})`);
		});
		it('update bg cover mask to no', () => {
			// having
			mockEdition(rainyEdition);

			// when
			const newEditionRainDetails = new RainDetails(sunnyEdition);
			newEditionRainDetails.updateBgCoverByRainMask();

			// then
			expect(getMaskId()).toBe(`url(#${RAIN_INFO_MASK_TYPES.FALSE})`);
		});
		it('do not update mask in case of same mask type', () => {
			// having
			mockEdition(rainyEdition);

			// when
			const newEditionRainDetails = new RainDetails(rainyEdition);
			newEditionRainDetails.updateBgCoverByRainMask();

			// then
			expect(getMaskId()).toBe(`url(#${RAIN_INFO_MASK_TYPES.TRUE})`);
		});
	});
	describe('update mask position', () => {
		it('update mask position', () => {
			// having
			mockEdition(rainyEdition);

			// when
			mockRainMaskPosition();
			RainDetails.updateBgCoverRainMaskPosition();

			// then
			expect(document.querySelector(`.${BG.MASK_SHAPE_YES}`).style.transform).toBe('translate(77px, 77px)');
		});
	});
});
