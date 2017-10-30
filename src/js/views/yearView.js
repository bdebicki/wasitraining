'use strict';

import { LAYOUT, EDITION, RAIN } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { edition } from '../classes/edition';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
import { editionDetails } from '../components/yearDetails/editionDetails';
import { rainDetails } from '../components/yearDetails/rainDetails';
import { yearDetails } from '../components/yearDetails/yearDetails'
import { footer } from '../components/footer/footer';
import { updateViewType } from '../utils/updateView';

export class yearView {
	constructor(data, editionId) {
		this.data = data;
		this.editionId = editionId;
	}

	updateViewTypeToYear() {
		updateViewType(VIEW_TYPES.YEAR);
	}

	updateDetails() {
		const newEditionId = this.data[this.editionId];
		const newEdition = new edition(newEditionId);
		const newEditionDetails = new editionDetails(newEditionId);
		const newRainDetails = new rainDetails(newEditionId);

		document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = newEdition.editionYear;
		document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = newEditionDetails.decorateEditionDates();
		document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = newEdition.editionFullName;
		document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = newEdition.editionPlace;
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).appendChild(newEditionDetails.updateHeadliners());
		document.querySelector(`.${RAIN.RAIN_CLASS}`).textContent = newEdition.editionRain;
		document.getElementById(RAIN.EDITION_RAIN_DETAILS_ID).appendChild(newRainDetails.updateRainDetails());
	}

	switchToYearView() {
		const yearBlock = new yearDetails(this.data[this.editionId], LAYOUT.MAIN_CONTAINER_ID);

		this.updateViewTypeToYear();
		document.getElementById(LAYOUT.TOP_ID).appendChild(document.getElementById(LAYOUT.TIMELINE_ID));
		yearBlock.render();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const data = this.data;
		const headerBlock = new header(data, body);
		const timelineBlock = new timeline(data, LAYOUT.TOP_ID);
		const yearBlock = new yearDetails(data[this.activeId], body);
		const footerBlock = new footer(body);

		this.updateViewTypeToYear();

		headerBlock.render();
		timelineBlock.render();
		yearBlock.render();
		footerBlock.render();
	}
}