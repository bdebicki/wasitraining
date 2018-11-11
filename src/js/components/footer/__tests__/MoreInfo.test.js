import MoreInfo from '../MoreInfo';

describe('test more info section', () => {
  it('render more info section', () => {
    const more = MoreInfo.render();

    expect(more).toMatchSnapshot();
  });
});
