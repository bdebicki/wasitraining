import cleanDOM from '../../../../tests/utils/cleanDOM';
import VIEW_TYPES from '../../enums/viewTypes';
import LAYOUT from '../../elementHandlers/layout';
import VIEWS from '../../views/elementHandlers/views';
import { updateViewType, updateComponentByViewType } from '../updateView';


const mockedComponentClassName = 'component';
const mockedComponentModifierClassName = 'component--modified';

function mockIntroView() {
	const main = document.createElement('div');

	main.id = LAYOUT.MAIN_CONTAINER_ID;

	document.body.appendChild(main);
	document.querySelector('html').dataset.view = VIEW_TYPES.INTRO;
}

function mockComponent() {
	const component = document.createElement('div');

	component.classList.add(mockedComponentClassName);

	document.body.appendChild(component);
}

afterAll(() => cleanDOM());

describe('test update view functions', () => {
	describe('test html element state based on view (updateView)', () => {
		mockIntroView();
		const htmlEl = document.querySelector('html');
		const mainContainer = document.querySelector(`#${LAYOUT.MAIN_CONTAINER_ID}`);

		it('update view from intro to edition', () => {
			updateViewType(VIEW_TYPES.YEAR);

			expect(htmlEl.dataset.view).toBe(VIEW_TYPES.YEAR);
			expect(mainContainer.classList.contains(VIEWS.INTRO_CLASS)).toBeFalsy();
		});
		it('update view from edition to intro', () => {
			updateViewType(VIEW_TYPES.INTRO);

			expect(htmlEl.dataset.view).toBe(VIEW_TYPES.INTRO);
			expect(mainContainer.classList.contains(VIEWS.INTRO_CLASS)).toBeTruthy();
		});
	});

	describe('test state of component based on view (updateComponentByViewType)', () => {
		mockComponent();
		const component = document.querySelector(`.${mockedComponentClassName}`);

		it('update component to edition view state from intro', () => {
			updateViewType(VIEW_TYPES.YEAR);
			updateComponentByViewType(component, mockedComponentModifierClassName);

			expect(component.classList.contains(mockedComponentModifierClassName)).toBeFalsy();
		});
		it('update component to intro view state from edition', () => {
			updateViewType(VIEW_TYPES.INTRO);
			updateComponentByViewType(component, mockedComponentModifierClassName);

			expect(component.classList.contains(mockedComponentModifierClassName)).toBeTruthy();
		});
	});
});
