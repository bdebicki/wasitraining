import LAYOUT from '../../elementHandlers/layout';
import addElement from '../../utils/addElement';
import CookiesInfo from './CookiesInfo';
import MoreInfo from './MoreInfo';

export default class Footer {
	static render() {
		const settings = {
			id: LAYOUT.FOOTER_ID,
			children: [
				CookiesInfo.render(),
				MoreInfo.render(),
			],
		};

		return addElement('footer', settings);
	}
}
