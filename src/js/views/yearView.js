'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
import { yearDetails } from '../components/yearDetails/yearDetails'
import { bgVideo } from '../components/bgVideo/bgVideo';
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
		const headerBlock = new header();
		const timelineBlock = new timeline();

		this.updateViewTypeToYear();
		headerBlock.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		timelineBlock.updateTimelineLocation(document.getElementById(LAYOUT.TIMELINE_ID));
		document.getElementById(LAYOUT.HEADER_ID).appendChild(document.getElementById(LAYOUT.TIMELINE_ID));

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
		const timelineBlock = new timeline(data, LAYOUT.HEADER_ID);
		const yearBlock = new yearDetails(data[this.editionId], body);
		const bgBlock = new bgVideo(body);
		const footerBlock = new footer(body);

		this.updateViewTypeToYear();

		headerBlock.render();
		timelineBlock.render();
		yearBlock.render();
		bgBlock.render();
		footerBlock.render();
	}
}