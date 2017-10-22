'use strict';

import { LAYOUT } from '../../enums/elementHandlers';

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
		const footer = this.createFooterContainer();

		document.getElementById(this.target).appendChild(footer);
	}
}