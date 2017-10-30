'use strict';

import { LAYOUT, EDITION, RAIN } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
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

	switchToYearView() {
		const yearBlock = new yearDetails(this.data[this.editionId], LAYOUT.MAIN_CONTAINER_ID);

		this.updateViewTypeToYear();
		document.getElementById(LAYOUT.TOP_ID).appendChild(document.getElementById(LAYOUT.TIMELINE_ID));
		yearBlock.render();
	}

	updateDetails() {
		const newEditionId = this.data[this.editionId];
		const yearBlock = new yearDetails(newEditionId);

		yearBlock.updateYearDetails();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const data = this.data;
		const headerBlock = new header(data, body);
		const timelineBlock = new timeline(data, LAYOUT.TOP_ID);
		const yearBlock = new yearDetails(data[this.editionId], body);
		const footerBlock = new footer(body);

		this.updateViewTypeToYear();

		headerBlock.render();
		timelineBlock.render();
		yearBlock.render();
		footerBlock.render();
	}
}