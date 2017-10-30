'use strict';

import { LAYOUT, EDITION, RAIN } from '../../enums/elementHandlers';
import { edition } from '../../classes/edition';
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

	updateYearDetails() {
		const editionId = this.editionId;
		const newEdition = new edition(editionId);
		const newEditionDetails = new editionDetails(editionId);
		const newRainDetails = new rainDetails(editionId);

		document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = newEdition.editionYear;
		document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = newEditionDetails.decorateEditionDates();
		document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = newEdition.editionFullName;
		document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = newEdition.editionPlace;
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).appendChild(newEditionDetails.updateHeadliners());
		document.querySelector(`.${RAIN.RAIN_CLASS}`).textContent = newEdition.editionRain;
		document.getElementById(RAIN.EDITION_RAIN_DETAILS_ID).appendChild(newRainDetails.updateRainDetails());
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