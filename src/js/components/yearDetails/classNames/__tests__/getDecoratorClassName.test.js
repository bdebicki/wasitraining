import getDecoratorClassName from '../getDecoratorClassName';

describe('test return value from getDecoratorClassName function', () => {
	it('return no value (null)', () => {
		expect(getDecoratorClassName(undefined)).toBeNull();
	});
	it('return multiple class names (array)', () => {
		expect(getDecoratorClassName(['expanded', 'promoted']))
			.toEqual([
				'lineupArtists__artist--expanded',
				'lineupArtists__artist--promoted',
			]);
	});
	it('return single class name', () => {
		expect(getDecoratorClassName('collapsed')).toBe('lineupArtists__artist--collapsed');
	});
});
