import { LAYOUT } from '../../enums/elementHandlers';
import CookiesInfo from './CookiesInfo';
import MoreInfo from './MoreInfo';

export default class Footer {
	constructor(target) {
		this.target = target;
	}

	renderFooterContainer() {
		const footerContainer = document.createElement('footer');

		footerContainer.id = LAYOUT.FOOTER_ID;

		return footerContainer;
	}

	render() {
		const cookies = new CookiesInfo();
		const more = new MoreInfo();
		const footerContainer = this.renderFooterContainer();

		footerContainer.appendChild(cookies.render());
		footerContainer.appendChild(more.render());

		document.getElementById(this.target).appendChild(footerContainer);
	}
}
