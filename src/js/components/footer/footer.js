'use strict';

import { LAYOUT } from '../../enums/elementHandlers';

export class footer {
	constructor(target) {
		this.target = target;
	}

	createFooterContainer() {
		let header = document.createElement('footer');
		header.id = LAYOUT.FOOTER_ID;

		return header;
	}

	render() {
		const footer = this.createFooterContainer();

		document.getElementById(this.target).appendChild(footer);
	}
}