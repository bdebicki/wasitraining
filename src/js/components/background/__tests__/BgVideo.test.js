import BgVideo from '../BgVideo';

describe('test background video component', () => {
	it('render background video component', () => {
		// when
		const videoEl = BgVideo.render();

		// then
		expect(videoEl).toMatchSnapshot();
	});
});
