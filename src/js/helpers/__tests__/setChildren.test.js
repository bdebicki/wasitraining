import using from '../../../../tests/utils/using';
import setChildren from '../setChildren';

const childrenCases = [
	{
		description: 'element with text',
		children: 'span element',
	},
	{
		description: 'element wit another element',
		children: document.createElement('span'),
	},
	{
		description: 'element with text and html element',
		children: [
			'span element',
			document.createElement('span'),
		],
	},
	{
		description: 'element with multiple html element',
		children: [
			document.createElement('span'),
			document.createElement('em'),
		],
	},
];

describe('tests for set children helper function', () => {
	using(childrenCases).describe('render <span> element with node', ({ description, children }) => {
		it(description, () => {
			// having
			const el = document.createElement('span');

			// when
			setChildren(el, children);

			// then
			expect(el).toMatchSnapshot();
		});
	});
});
