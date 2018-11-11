import CookiesInfo from '../CookiesInfo';

describe('test cookies info section', () => {
  it('render cookies section', () => {
    const cookies = CookiesInfo.render();

    expect(cookies).toMatchSnapshot();
  });
});
