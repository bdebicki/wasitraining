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
		const timelineBlock = new timeline();

		this.updateViewTypeToIntro();
		titleBlock.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		headerBlock.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		timelineBlock.updateTimelineLocation(document.getElementById(LAYOUT.TIMELINE_ID));
		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).appendChild(document.getElementById(LAYOUT.TIMELINE_ID));
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
		timelineBlock.render();
		bgBlock.render();
		footerBlock.render();
	}
}