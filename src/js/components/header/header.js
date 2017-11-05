'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { title } from './title'

export class header {
	constructor(data, target) {
		this.data = data;
		this.target = target;
	}

	renderHeaderContainer() {
		let header = document.createElement('header');

		header.id = LAYOUT.HEADER_ID;

		return header;
	}

	render() {
		const pageTitle = new title();
		let header = this.renderHeaderContainer();

		header.appendChild(pageTitle.render());

		document.getElementById(this.target).appendChild(header);
	}
}
