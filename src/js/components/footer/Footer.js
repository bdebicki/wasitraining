import LAYOUT from '../../elementHandlers/layout';
import CookiesInfo from './CookiesInfo';
import MoreInfo from './MoreInfo';

export default class Footer {
	static renderFooterContainer() {
		const footerContainer = document.createElement('footer');

		footerContainer.id = LAYOUT.FOOTER_ID;

		return footerContainer;
	}

	static render() {
		const footerContainer = Footer.renderFooterContainer();

		footerContainer.appendChild(CookiesInfo.render());
		footerContainer.appendChild(MoreInfo.render());

		return footerContainer;
	}
}
