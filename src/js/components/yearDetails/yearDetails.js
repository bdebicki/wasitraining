'use strict';

import { LAYOUT } from '../../enums/elementHandlers';
import { editionDetails } from './editionDetails';
import { rainDetails } from './rainDetails';
import { lineupDetails } from './lineupDetails';

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

	updateYearDetails() {
		const editionId = this.editionId;
		const editionBlock = new editionDetails(editionId);
		const rainBlock = new rainDetails(editionId);
		const lineupDialogbox = new lineupDetails(editionId);

		editionBlock.updateEditionDetails();
		rainBlock.updateRainDetails();
		lineupDialogbox.updateLineupDetails();
	}

	render() {
		let yearBlock = this.renderYearContainer();
		const editionId = this.editionId;
		const editionBlock = new editionDetails(editionId);
		const rainBlock = new rainDetails(editionId);
		const lineupDialogbox = new lineupDetails(editionId);

		yearBlock.appendChild(editionBlock.render());
		yearBlock.appendChild(rainBlock.render());
		yearBlock.appendChild(lineupDialogbox.render());
		document.getElementById(this.target).appendChild(yearBlock);
	}
}