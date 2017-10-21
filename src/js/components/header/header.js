'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { title } from './title'
import { renderTimeline } from '../timeline/renderTimeline';

export class header {
	constructor(data, activeEdition) {
		this.data = data;
		this.activeEdition = activeEdition;
	}

	createHeaderContainer() {
		let header = document.createElement('header');
		header.id = LAYOUT.TOP_ID;

		return header;
	}

	render() {
		const pageTitle = new title();
		let header = this.createHeaderContainer();

		header.appendChild(pageTitle.render());
		renderTimeline(header, this.data, this.activeEdition);

		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).appendChild(header);
	}
}