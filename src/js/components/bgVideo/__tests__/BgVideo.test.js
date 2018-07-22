import cleanDOM from '../../../../../testUtils/cleanDOM';
import BgVideo from '../BgVideo';
import BG from '../elementHandlers/background';

const videoContainerId = 'videoContainer';

function prepareContainerForVide() {
	document.body.id = videoContainerId;
}

afterAll(() => cleanDOM());

describe('test background video component', () => {
	prepareContainerForVide();

	it('render background video into container', () => {
		// having
		const videoEl = new BgVideo(videoContainerId);

		// when
		videoEl.render();

		// then
		expect(document.querySelector(`.${BG.VIDEO_CLASS}`)).toBeTruthy();
	});
});
