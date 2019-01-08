import BgCanvas from '../BgCover';

describe('test background cover component', () => {
	it('render background cover component', () => {
		// when
		const coverEl = BgCanvas.render();

		// then
		expect(coverEl).toMatchSnapshot();
	});
});
