import cleanDOM from '../../../../tests/utils/cleanDOM';
import prepareContainer from '../../../../tests/utils/prepareContainer';
import spyConsole from '../../../../tests/utils/spyConsole';
import complexEditions from '../../../../tests/utils/complexEditions';
import editionsData from '../../../../tests/__mocks__/editions.json';
import HEADER from '../../components/header/elementHandlers/header';
import LAYOUT from '../../elementHandlers/layout';
import VIEW_TYPES from '../../enums/viewTypes';
import IntroView from '../IntroView';
import YearView from '../YearView';

function mockEditionView() {
	const edition = new YearView(complexEditions(), 3);

	edition.render();
}

describe('intro view tests', () => {
	spyConsole();

	const introView = new IntroView(editionsData);
	beforeEach(() => prepareContainer(LAYOUT.MAIN_CONTAINER_ID));
	afterEach(() => cleanDOM());

	it('render intro view', () => {
		// when
		introView.render();

		// then
		expect(console.error).not.toHaveBeenCalled();
	});
	it('render intro view correctly', () => {
		// when
		introView.render();

		// then
		expect(document.querySelector('html').dataset.view).toBe(VIEW_TYPES.INTRO);
		expect(document.getElementById(LAYOUT.HEADER_ID)).toBeTruthy();
		expect(document.getElementById(LAYOUT.MAIN_TIMELINE_ID)).toBeTruthy();
		expect(document.getElementById(LAYOUT.BG_VIDEO_ID)).toBeTruthy();
		expect(document.getElementById(LAYOUT.FOOTER_ID)).toBeTruthy();
	});
	it('update view to intro', () => {
		// having
		mockEditionView();

		// when
		introView.switchToIntoView();

		// then
		expect(document.querySelector('html').dataset.view).toBe(VIEW_TYPES.INTRO);
		expect(document.querySelector(`.${HEADER.TITLE_CLASS}`).classList.contains(HEADER.TITLE_HEADER_CLASS))
			.toBeTruthy();
		expect(document.getElementById(LAYOUT.HEADER_ID).classList.contains(HEADER.INTRO_HEADER_CLASS)).toBeTruthy();
		expect(document.getElementById(LAYOUT.MAIN_TIMELINE_ID)).toBeTruthy();
		expect(document.getElementById(LAYOUT.NAV_TIMELINE_ID)).toBeFalsy();
		expect(document.getElementById(LAYOUT.YEAR_CONTAINER_ID)).toBeFalsy();
		expect(document.getElementById(LAYOUT.BG_COVER_ID)).toBeFalsy();
	});

	describe('check does tomeline scrolling events behave correctly', () => {
		// handleTimelineScrollingEvents
	});
});
