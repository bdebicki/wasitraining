'use strict';

import { LAYOUT } from '../../enums/elementHandlers';

export class header {
	createHeaderContainer() {
		let header = document.createElement('header');
		header.id = LAYOUT.TOP_ID;

		return header;
	}

	render() {
		let header = this.createHeaderContainer();

		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).appendChild(header);
	}
}