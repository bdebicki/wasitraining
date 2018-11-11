import cleanDOM from '../../../../tests/utils/cleanDOM';
import prepareContainer from '../../../../tests/utils/prepareContainer';
import spyConsole from '../../../../tests/utils/spyConsole';
import complexEditions from '../../../../tests/utils/complexEditions';
import EDITION from '../../components/yearDetails/elementHandlers/edition';
import HEADER from '../../components/header/elementHandlers/header';
import LAYOUT from '../../elementHandlers/layout';
import TIMELINE from '../../components/timeline/elementHandlers/timeline';
import VIEW_TYPES from '../../enums/viewTypes';
import IntroView from '../IntroView';
import YearView from '../YearView';

let yearView;

describe('edition year view tests', () => {
  spyConsole();

  beforeEach(() => {
    prepareContainer(LAYOUT.MAIN_CONTAINER_ID);
    yearView = new YearView(complexEditions(), 3);
  });
  afterEach(() => cleanDOM());

  it('render year view', () => {
    // when
    yearView.render();

    // then
    expect(console.error).not.toHaveBeenCalled();
  });
  it('render year view correctly', () => {
    // when
    yearView.render();

    // then
    expect(document.querySelector('html').dataset.view).toBe(VIEW_TYPES.YEAR);
    expect(document.getElementById(LAYOUT.HEADER_ID)).toBeTruthy();
    expect(document.getElementById(LAYOUT.NAV_TIMELINE_ID)).toBeTruthy();
    expect(document.getElementById(LAYOUT.YEAR_CONTAINER_ID)).toBeTruthy();
    expect(document.getElementById(LAYOUT.BG_VIDEO_ID)).toBeTruthy();
    expect(document.getElementById(LAYOUT.FOOTER_ID)).toBeTruthy();
  });
  it('update view to year', () => {
    // having
    const intro = new IntroView(complexEditions());
    intro.render();

    // when
    yearView.switchToYearView();

    // then
    expect(document.querySelector('html').dataset.view).toBe(VIEW_TYPES.YEAR);
    expect(document.querySelector(`.${HEADER.TITLE_CLASS}`).classList.contains(HEADER.TITLE_HEADER_CLASS))
      .toBeFalsy();
    expect(document.getElementById(LAYOUT.HEADER_ID).classList.contains(HEADER.INTRO_HEADER_CLASS)).toBeFalsy();
    expect(document.getElementById(LAYOUT.NAV_TIMELINE_ID)).toBeTruthy();
    expect(document.getElementById(LAYOUT.YEAR_CONTAINER_ID)).toBeTruthy();
    expect(document.getElementById(LAYOUT.MAIN_TIMELINE_ID)).toBeFalsy();
  });
  it('update year view by new edition', () => {
    // having
    yearView.render();

    // when
    const newEditionItem = document.querySelector('a[href="#edition4"]');
    const newEdition = new YearView(complexEditions(), 4);
    newEdition.updateDetails(newEditionItem);

    // then
    expect(newEditionItem.classList.contains(TIMELINE.NAV_EDITION_ACTIVE_CLASS)).toBeTruthy();
    expect(document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent).toBe('2005');
  });
});
