import editionData from '../../../../../tests/__mocks__/edition-alphabeticalExceptHeadliners-noMergeArtists.json';
import TimelineItem from '../TimelineItem';

const timelineItem = new TimelineItem(editionData);

describe('timeline item component', () => {
  it('render main timeline item', () => {
    expect(timelineItem.renderMainEdition()).toMatchSnapshot();
  });
  it('render nav timeline item', () => {
    expect(timelineItem.renderNavEdition()).toMatchSnapshot();
  });
  it('render active nav timeline item', () => {
    expect(timelineItem.renderNavEdition(true)).toMatchSnapshot();
  });
});
