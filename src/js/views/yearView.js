'use strict';

import { LAYOUT, HEADER } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { title } from '../components/header/title';
import { navTimeline } from '../components/timeline/navTimeline';
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

	updateDetails() {
		const newEditionId = this.data[this.editionId];
		const yearBlock = new yearDetails(newEditionId);

		yearBlock.updateYearDetails();
	}

	switchToYearView() {
		const yearBlock = new yearDetails(this.data[this.editionId], LAYOUT.MAIN_CONTAINER_ID);
		const titleBlock = new title();
		const headerBlock = new header();
		const navTimelineBlock = new navTimeline(this.data, this.editionId, LAYOUT.HEADER_ID);

		this.updateViewTypeToYear();
		titleBlock.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		headerBlock.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		navTimelineBlock.render();
		yearBlock.render();
		document.getElementById(LAYOUT.MAIN_TIMELINE_ID).remove();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const data = this.data;
		const editionId = this.editionId;
		const headerBlock = new header(data, body);
		const navTimelineBlock = new navTimeline(data, editionId, LAYOUT.HEADER_ID);
		const yearBlock = new yearDetails(data[editionId], body);
		const bgBlock = new bgVideo(body);
		const footerBlock = new footer(body);

		this.updateViewTypeToYear();
		headerBlock.render();
		navTimelineBlock.render();
		yearBlock.render();
		bgBlock.render();
		footerBlock.render();
	}
}