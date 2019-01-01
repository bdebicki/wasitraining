import getModifierClassNameByKey from '../getModifierClassNameByKey';

describe('test return value from getModifierClassNameByKey function', () => {
	it('return no value (null)', () => {
		expect(getModifierClassNameByKey(undefined)).toBeNull();
	});
	it('return multiple class names (array)', () => {
		expect(getModifierClassNameByKey(['expanded', 'promoted']))
			.toEqual([
				'lineupArtists__artist--expanded',
				'lineupArtists__artist--promoted',
			]);
	});
	it('return single class name', () => {
		expect(getModifierClassNameByKey('collapsed')).toBe('lineupArtists__artist--collapsed');
	});
	it('return single class name for headliners', () => {
		expect(getModifierClassNameByKey('day1', 'headliners')).toBe('headliner--day1');
	});
});
