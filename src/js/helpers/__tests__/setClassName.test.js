import using from '../../../../tests/utils/using';
import setClassName from '../setClassName';

const classNameCases = [
	{
		description: 'element with single class name',
		classNames: 'spanEl',
	},
	{
		description: 'element with multiple class name',
		classNames: [
			'spanEl',
			'spanEl--modifier',
		],
	},
];


describe('tests for set children helper function', () => {
	using(classNameCases).describe('render <span> element with specific class names', ({ description, classNames }) => {
		it(description, () => {
			// having
			const el = document.createElement('span');

			// when
			setClassName(el, classNames);

			// then
			expect(el).toMatchSnapshot();
		});
	});
});
