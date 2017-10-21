'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { title } from './title'

export class header {
	createHeaderContainer() {
		let header = document.createElement('header');
		header.id = LAYOUT.TOP_ID;

		return header;
	}

	render() {
		const pageTitle = new title();
		let header = this.createHeaderContainer();

		header.appendChild(pageTitle.render());

		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).appendChild(header);
	}
}