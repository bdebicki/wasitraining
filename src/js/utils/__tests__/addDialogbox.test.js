import cleanDOM from '../../../../tests/utils/cleanDOM';
import using from '../../../../tests/utils/using';
import { addDialogbox, toggleDialogboxAction, toggleDialogboxWithInactive } from '../addDialogbox';
import DIALOGBOX from '../elementHandlers/dialogbox';

const dialogboxCases = [
  {
    description: 'render dialogbox with default and required propertis settings',
    settings: {
      id: 'lineupDialogbox',
      title: 'Lineup 2018',
      content: mockDialogboxContent(),
    },
  }, {
    description: 'render dialogbox with overwrite propertis with default values (stretched, closeTitle)',
    settings: {
      id: 'lineupDialogbox',
      title: 'Lineup 2018',
      content: mockDialogboxContent(),
      stretched: true,
      closeTitle: 'close dialogbox',
    },
  }, {
    description: 'render dialogbox with additional properties (classNames, adataAttr)',
    settings: {
      id: 'lineupDialogbox',
      title: 'Lineup 2018',
      content: mockDialogboxContent(),
      classNames: ['dialogbox-visible', 'lineup--edition2018'],
      dataAttr: [['year', '2018']],
    },
  },
];
const dialogboxElClassName = 'dialogboxEl';
const customElClassName = 'customEl';

function mockDialogboxContent() {
  const dialogboxContent = document.createElement('div');
  dialogboxContent.textContent = 'Simple dialogbox content';

  return dialogboxContent;
}
function mockDOMwithDialogbox(withCustomEl = false) {
  const settings = {
    classNames: [dialogboxElClassName],
    id: withCustomEl ? 'lineupDialogboxOverEl' : 'lineupDialogbox',
    title: 'Lineup 2018',
    content: mockDialogboxContent(),
  };

  if (withCustomEl) {
    Object.assign(settings, { closeAction: toggleDialogboxWithInactive });
  }

  const dialogboxEl = addDialogbox(settings);
  document.body.appendChild(dialogboxEl);

  if (withCustomEl) {
    const customEl = document.createElement('div');

    customEl.classList.add(customElClassName);
    document.body.appendChild(customEl);
  }
}

afterAll(() => cleanDOM());

describe('tests for addDialogbox', () => {
  using(dialogboxCases).describe('test how dialogbox element is rendered', ({ description, settings }) => {
    it(description, () => {
      const dialogboxEl = addDialogbox(settings);

      expect(dialogboxEl).toMatchSnapshot();
    });
  });
  it('check does dialogbox element has been added to body', () => {
    mockDOMwithDialogbox();

    expect(document.querySelector(`.${dialogboxElClassName}`)).toBeTruthy();
  });
  describe('test dialogbox simple toggle actions', () => {
    it('show dialogbox', () => {
      toggleDialogboxAction('#lineupDialogbox');

      expect(document.querySelector('#lineupDialogbox').classList.contains(DIALOGBOX.VISIBLE_CLASS)).toBeTruthy();
    });
    it('hide dialogbox', () => {
      document.querySelector(`#lineupDialogbox .${DIALOGBOX.CLOSE_CLASS}`).click();

      expect(document.querySelector('#lineupDialogbox').classList.contains(DIALOGBOX.VISIBLE_CLASS)).toBeFalsy();
    });
  });
  describe('test dialogbox toggle actions with inactive some component', () => {
    mockDOMwithDialogbox(true);

    it('show dialogbox and set inactive container under dialobox', () => {
      toggleDialogboxAction('#lineupDialogboxOverEl', `.${customElClassName}`);

      expect(document.querySelector('#lineupDialogboxOverEl').classList.contains(DIALOGBOX.VISIBLE_CLASS))
        .toBeTruthy();
      expect(document.querySelector(`.${customElClassName}`).classList.contains(DIALOGBOX.INACTIVE_HELPER_CLASS))
        .toBeTruthy();
    });
    it('hide dialogbox and set active container under dialobox', () => {
      document.querySelector(`#lineupDialogboxOverEl .${DIALOGBOX.CLOSE_CLASS}`).click();

      expect(document.querySelector('#lineupDialogboxOverEl').classList.contains(DIALOGBOX.VISIBLE_CLASS))
        .toBeFalsy();
      expect(document.querySelector(`.${customElClassName}`).classList.contains(DIALOGBOX.INACTIVE_HELPER_CLASS))
        .toBeFalsy();
    });
  });
});
