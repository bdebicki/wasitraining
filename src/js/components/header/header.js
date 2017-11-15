'use strict';

import { TITLE } from '../../enums/content';
import { LAYOUT, HEADER } from '../../enums/elementHandlers';
import { updateComponentByViewType } from '../../utils/updateView';
import { title } from './title'

export class header {
	constructor(data, target) {
		this.data = data;
		this.target = target;
	}

	updateHeaderLocation(el) {
		updateComponentByViewType(el, HEADER.INTRO_HEADER_CLASS);
	}

	renderHeaderContainer() {
		let header = document.createElement('header');

		header.id = LAYOUT.HEADER_ID;
		header.dataset.bgText = TITLE;
		this.updateHeaderLocation(header);

		return header;
	}

	render() {
		const pageTitle = new title();
		let header = this.renderHeaderContainer();

		header.appendChild(pageTitle.render());

		document.getElementById(this.target).appendChild(header);
	}
}
