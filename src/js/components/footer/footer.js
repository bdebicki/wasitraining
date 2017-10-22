'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { cookiesInfo } from './cookies';

export class footer {
	constructor(target) {
		this.target = target;
	}

	createFooterContainer() {
		let footer = document.createElement('footer');

		footer.id = LAYOUT.FOOTER_ID;

		return footer;
	}

	render() {
		const cookies = new cookiesInfo();
		let footer = this.createFooterContainer();

		footer.appendChild(cookies.render());

		document.getElementById(this.target).appendChild(footer);
	}
}