import getSliceDecoratorClassName from '../getSliceDecoratorClassName';

describe('return value from getSliceDecoratorClassName function', () => {
  it('return no value (null)', () => {
    expect(getSliceDecoratorClassName(undefined)).toBeNull();
  });

  it('return slice decorator class name', () => {
    expect(getSliceDecoratorClassName('up')).toBe('lineupArtists__slice--up');
  });
});
