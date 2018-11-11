import getAlignClassName from '../getAlignClassName';

describe('test return value from getAlignClassName function', () => {
	it('return no value (null)', () => {
		expect(getAlignClassName(undefined)).toBeNull();
	});

	it('return align class name', () => {
		expect(getAlignClassName('right')).toBe('lineupArtists__artist--rightAligned');
	});
});
