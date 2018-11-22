import setIcon from '../setIcon';
import icons from '../../helpers/iconsLibrary';

describe('tests for set icon', () => {
	it('it renders icon with single class name', () => {
		expect(setIcon(icons.close(), 'iconClose')).toMatchSnapshot();
	});
	it('it renders icon with multiple class names', () => {
		expect(setIcon(icons.close(), ['iconClose', 'additionalClass'])).toMatchSnapshot();
	});
});
