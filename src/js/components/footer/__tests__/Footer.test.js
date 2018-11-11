import Footer from '../Footer';

describe('tests for footer component', () => {
  it('render footer component', () => {
    // when
    const footerEl = Footer.render();

    // then
    expect(footerEl).toMatchSnapshot();
  });
});
