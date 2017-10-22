'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { title } from './title'
import { timeline } from '../timeline/timeline';

export class header {
	constructor(data, activeEdition, target) {
		this.data = data;
		this.activeEdition = activeEdition;
		this.target = target;
	}

	createHeaderContainer() {
		let header = document.createElement('header');
		header.id = LAYOUT.TOP_ID;

		return header;
	}

	render() {
		const pageTitle = new title();
		const festivalTimeline = new timeline(this.data, this.activeEdition);
		let header = this.createHeaderContainer();

		header.appendChild(pageTitle.render());
		header.appendChild(festivalTimeline.render());

		document.getElementById(this.target).appendChild(header);
	}
}
