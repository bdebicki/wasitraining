import cleanDOM from '../../../../testUtils/cleanDOM';
import using from '../../../../testUtils/using';
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
function mockDOMwithDialogbox() {
	const dialogboxEl = addDialogbox({
		classNames: [dialogboxElClassName],
		id: 'lineupDialogbox',
		title: 'Lineup 2018',
		content: mockDialogboxContent(),
	});
	document.body.appendChild(dialogboxEl);
}
function mockDOMwithDialogboxAndCustomEl() {
	const dialogboxEl = addDialogbox({
		classNames: [dialogboxElClassName],
		id: 'lineupDialogboxOverEl',
		title: 'Lineup 2018',
		closeAction: toggleDialogboxWithInactive,
		content: mockDialogboxContent(),
	});
	const customEl = document.createElement('div');

	customEl.classList.add(customElClassName);

	document.body.appendChild(dialogboxEl);
	document.body.appendChild(customEl);
}

// eslint-disable-next-line no-undef
afterAll(() => cleanDOM());

describe('tests for addDialogbox', () => {
	using(dialogboxCases).describe('render dialogbox element', ({ description, settings }) => {
		it(description, () => {
			const dialogboxEl = addDialogbox(settings);

			expect(dialogboxEl).toMatchSnapshot();
		});
	});
	describe('test dialogbox simple toggle actions', () => {
		mockDOMwithDialogbox();

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
		mockDOMwithDialogboxAndCustomEl();

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
