import using from '../../../../testUtils/using';
import { addDialogbox } from '../addDialogbox';

function mockDialogboxContent() {
	const dialogboxContent = document.createElement('div');
	dialogboxContent.textContent = 'Simple dialogbox content';

	return dialogboxContent;
}

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

describe('render dialogbox element', () => {
	using(dialogboxCases).describe('', ({ description, settings }) => {
		it(description, () => {
			const dialogboxEl = addDialogbox(settings);

			expect(dialogboxEl).toMatchSnapshot();
		});
	});
});
