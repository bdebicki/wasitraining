import addElement from '../addElement';
import cleanDOM from '../../../../tests/utils/cleanDOM';
import using from '../../../../tests/utils/using';
import spyConsole from '../../../../tests/utils/spyConsole';

const elementTag = 'span';
const addElementCases = [
	{
		description: 'simple <span> element',
		tag: elementTag,
	},
	{
		description: '<span> element with id and title',
		tag: elementTag,
		settings: {
			id: 'spanId',
			title: 'span element tile',
		},
	},
	{
		description: 'link <a> element with href attribute',
		tag: 'a',
		settings: {
			href: 'http://google.com',
		},
	},
	{
		description: 'element with single class name',
		tag: elementTag,
		settings: {
			classNames: 'spanEl',
		},
	},
	{
		description: 'element with single data attribute',
		tag: elementTag,
		settings: {
			dataAttr: { spanElDataAttr: 'data value' },
		},
	},
	{
		description: 'element with multiple data attribute',
		tag: elementTag,
		settings: {
			dataAttr: [
				{ firstDataAttr: 'first data attr value' },
				{ secondDataAttr: 'second data attr value' },
			],
		},
	},
	{
		description: 'element with text',
		tag: elementTag,
		settings: {
			children: 'span element',
		},
	},
];

afterAll(() => cleanDOM());

describe('addElement function tests', () => {
	spyConsole();

	using(addElementCases).describe('render html element using addElement', ({ description, tag, settings }) => {
		it(description, () => {
			const el = addElement(tag, settings);

			expect(el).toMatchSnapshot();
		});
	});
	it('test element with click event listener', () => {
		// having
		const el = addElement(elementTag, {
			classNames: 'spanEl',
			onClick: () => console.log(),
		});
		document.body.appendChild(el);

		// when
		document.querySelector('.spanEl').click();

		// then
		expect(console.log).toHaveBeenCalled();
	});
});
