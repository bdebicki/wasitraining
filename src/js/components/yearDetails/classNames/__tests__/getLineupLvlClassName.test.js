import getLineupLvlClassName from '../getLineupLvlClassName';

describe('return test value from getLineupLvlClassName function', () => {
  it('return lvl section class name', () => {
    expect(getLineupLvlClassName('others')).toBe('lineupArtists__lvl--others');
  });
});
