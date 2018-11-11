import getSeparatorElementLvlClassName from '../getSeparatorElementLvlClassName';

describe('test return value from getSeparatorElementLvlClassName function', () => {
  it('return separator element class name', () => {
    expect(getSeparatorElementLvlClassName('lvl1')).toBe('lineupArtists__separatorElement--lvl1');
  });
});
