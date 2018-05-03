import { LAYOUT } from '../../enums/elementHandlers';
import CookiesInfo from './CookiesInfo';
import MoreInfo from './MoreInfo';

export default class Footer {
	constructor(target) {
		this.target = target;
	}

	static renderFooterContainer() {
		const footerContainer = document.createElement('footer');

		footerContainer.id = LAYOUT.FOOTER_ID;

		return footerContainer;
	}

	render() {
		const footerContainer = Footer.renderFooterContainer();

		footerContainer.appendChild(CookiesInfo.render());
		footerContainer.appendChild(MoreInfo.render());

		document.getElementById(this.target).appendChild(footerContainer);
	}
}
