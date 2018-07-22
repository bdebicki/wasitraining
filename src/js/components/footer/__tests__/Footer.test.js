import cleanDOM from '../../../../../testUtils/cleanDOM';
import prepareContainer from '../../../../../testUtils/prepareContainer';
import LAYOUT from '../../../elementHandlers/layout';
import FOOTER from '../elementHandlers/footer';
import Footer from '../Footer';

const footerContainerId = 'footerContainer';

afterAll(() => cleanDOM());

describe('tests for footer component', () => {
	prepareContainer(footerContainerId);

	// having
	const footer = new Footer(footerContainerId);

	// then
	footer.render();

	describe('check does footer parts are added correctly', () => {
		it('check does cookies info renders into footer', () => {
			expect(document.querySelector(`.${FOOTER.COOKIES_CLASS}`)).toBeTruthy();
		});
		it('check does more info renders into footer', () => {
			expect(document.querySelector(`.${FOOTER.ABOUT_SECTION_CLASS}`)).toBeTruthy();
		});
	});

	it('render footer into container', () => {
		expect(document.querySelector(`#${LAYOUT.FOOTER_ID}`)).toBeTruthy();
	});
});
