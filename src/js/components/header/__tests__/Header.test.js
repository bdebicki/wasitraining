import cleanDOM from '../../../../../tests/utils/cleanDOM';
import mockView from '../../../../../tests/utils/mockView';
import HEADER from '../elementHandlers/header';
import VIEW_TYPES from '../../../enums/viewTypes';
import Header from '../Header';

afterAll(() => cleanDOM());

describe('tests header component', () => {
	it('check dose title component renders correct', () => {
		// when
		const title = Header.render();

		// then
		expect(title).toMatchSnapshot();
	});

	it('check does title on home view has modifier class name', () => {
		// having
		mockView(VIEW_TYPES.INTRO);

		// when
		const title = Header.render();

		// then
		expect(title.classList.contains(HEADER.INTRO_HEADER_CLASS)).toBeTruthy();
	});
});
