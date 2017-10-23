'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { editionDetails } from './editionDetails';

export class yearDetails {
	constructor(editionId, target) {
		this.editionId = editionId;
		this.target = target;
	}

	renderYearContainer() {
		let section = document.createElement('section');

		section.id = LAYOUT.YEAR_CONTAINER_ID;

		return section;
	}

	renderRainDetails() {

	}

	render() {
		let yearBlock = this.renderYearContainer();
		const editionBlock = new editionDetails(this.editionId);

		yearBlock.appendChild(editionBlock.render());
		document.getElementById(this.target).appendChild(yearBlock);
	}
}