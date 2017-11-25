'use strict';

import { LAYOUT, HEADER } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { title } from '../components/header/title';
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

	updateDetails(newEdition) {
		const newEditionData = this.data[this.editionId];
		const yearBlock = new yearDetails(newEditionData);
		const timelineBlock = new timeline();

		timelineBlock.updateSelectedEdition(newEdition);
		yearBlock.updateYearDetails();
	}

	switchToYearView() {
		const yearBlock = new yearDetails(this.data[this.editionId], LAYOUT.MAIN_CONTAINER_ID);
		const titleBlock = new title();
		const headerBlock = new header();
		const timelineBlock = new timeline(this.data, LAYOUT.HEADER_ID, this.editionId);

		this.updateViewTypeToYear();
		titleBlock.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		headerBlock.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		timelineBlock.renderNavTimeline();
		yearBlock.render();
		document.getElementById(LAYOUT.MAIN_TIMELINE_ID).remove();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const data = this.data;
		const editionId = this.editionId;
		const headerBlock = new header(data, body);
		const timelineBlock = new timeline(data, LAYOUT.HEADER_ID, editionId);
		const yearBlock = new yearDetails(data[editionId], body);
		const bgBlock = new bgVideo(body);
		const footerBlock = new footer(body);

		this.updateViewTypeToYear();
		headerBlock.render();
		timelineBlock.renderNavTimeline();
		yearBlock.render();
		bgBlock.render();
		footerBlock.render();
	}
}