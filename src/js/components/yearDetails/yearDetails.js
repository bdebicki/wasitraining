'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { editionDetails } from './editionDetails';
import { rainDetails } from './rainDetails';

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

	render() {
		let yearBlock = this.renderYearContainer();
		const editionId = this.editionId;
		const editionBlock = new editionDetails(editionId);
		const rainBlock = new rainDetails(editionId);

		yearBlock.appendChild(editionBlock.render());
		yearBlock.appendChild(rainBlock.render());
		document.getElementById(this.target).appendChild(yearBlock);
	}
}