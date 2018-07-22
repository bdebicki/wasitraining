import cleanDOM from '../../../../../testUtils/cleanDOM';
import prepareContainer from '../../../../../testUtils/prepareContainer';
import BgVideo from '../BgVideo';
import BG from '../elementHandlers/background';

const videoContainerId = 'videoContainer';

afterAll(() => cleanDOM());

describe('test background video component', () => {
	prepareContainer(videoContainerId);

	it('render background video into container', () => {
		// having
		const videoEl = new BgVideo(videoContainerId);

		// when
		videoEl.render();

		// then
		expect(document.querySelector(`.${BG.VIDEO_CLASS}`)).toBeTruthy();
	});
});
