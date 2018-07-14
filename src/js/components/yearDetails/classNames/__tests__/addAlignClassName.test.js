import getAlignClassName from '../getArtistLvlClassName';

describe('getAlignClassName', () => {
	it('return headliner class name', () => {
		expect(getAlignClassName('headliners')).toBe('lineupArtists__artist--headliner');
	});
	it('return lvl class name', () => {
		expect(getAlignClassName('lvl1')).toBe('lineupArtists__artist--lvl1');
	});
});
