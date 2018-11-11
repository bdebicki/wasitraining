import cleanDOM from '../../../../../tests/utils/cleanDOM';
import editionsData from '../../../../../tests/__mocks__/editions.json';
import TIMELINE from '../elementHandlers/timeline';
import Timeline from '../Timeline';

const timeline = new Timeline(editionsData, 2);

describe('timeline component', () => {
  it('update active on navigation timeline', () => {
    // having
    document.body.appendChild(timeline.renderNavTimeline());
    const firstPosition = document.querySelector("[href='#edition1']");
    const secondPosition = document.querySelector("[href='#edition2']");

    // when
    Timeline.updateSelectedEdition(firstPosition);

    // then
    expect(secondPosition.classList.contains(TIMELINE.NAV_EDITION_ACTIVE_CLASS)).toBeFalsy();
    expect(firstPosition.classList.contains(TIMELINE.NAV_EDITION_ACTIVE_CLASS)).toBeTruthy();

    cleanDOM();
  });
  describe('render timeline', () => {
    it('render homepage timeline', () => {
      expect(timeline.renderMainTimeline()).toMatchSnapshot();
    });
    it('render navigation timeline', () => {
      expect(timeline.renderNavTimeline()).toMatchSnapshot();
    });
  });
});

