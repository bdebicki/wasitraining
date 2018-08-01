import cleanDOM from '../../../../../tests/utils/cleanDOM';
import mockView from '../../../../../tests/utils/mockView';
import VIEW_TYPES from '../../../enums/viewTypes';
import Title from '../Title';
import HEADER from '../elementHandlers/header';

afterAll(() => cleanDOM());

describe('test title component', () => {
	it('check dose title component renders correct', () => {
		// when
		const title = Title.render();

		// then
		expect(title).toMatchSnapshot();
	});

	it('check does title on home view has modifier class name', () => {
		// having
		mockView(VIEW_TYPES.INTRO);

		// when
		const title = Title.render();


		// then
		expect(title.classList.contains(HEADER.TITLE_HEADER_CLASS)).toBeTruthy();
	});
});
