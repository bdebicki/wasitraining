'use strict';

import { LAYOUT, HEADER } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { title } from '../components/header/title';
import { timeline } from '../components/timeline/timeline';
import { bgVideo } from '../components/bgVideo/bgVideo';
import { footer } from '../components/footer/footer';
import { updateViewType } from '../utils/updateView';

export class introView {
	constructor(data) {
		this.data = data
	}

	updateViewTypeToIntro() {
		updateViewType(VIEW_TYPES.INTRO);
	}

	switchToIntoView() {
		const titleBlock = new title();
		const headerBlock = new header();
		const timelineBlock = new timeline(this.data, LAYOUT.MAIN_CONTAINER_ID);

		this.updateViewTypeToIntro();
		titleBlock.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		headerBlock.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		timelineBlock.renderMainTimeline();
		document.getElementById(LAYOUT.NAV_TIMELINE_ID).remove();
		document.getElementById(LAYOUT.YEAR_CONTAINER_ID).remove();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const headerBlock = new header(this.data, body);
		const timelineBlock = new timeline(this.data, body);
		const bgBlock = new bgVideo(body);
		const footerBlock = new footer(body);

		this.updateViewTypeToIntro();
		headerBlock.render();
		timelineBlock.renderMainTimeline();
		bgBlock.render();
		footerBlock.render();
	}
}