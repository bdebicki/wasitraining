'use strict';

import { LAYOUT, HEADER } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { title } from '../components/header/title';
import { mainTimeline } from '../components/timeline/mainTimeline';
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
		const mainTimelineBlock = new mainTimeline(this.data, LAYOUT.MAIN_CONTAINER_ID);

		this.updateViewTypeToIntro();
		titleBlock.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		headerBlock.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		mainTimelineBlock.render();
		document.getElementById(LAYOUT.NAV_TIMELINE_ID).remove();
		document.getElementById(LAYOUT.YEAR_CONTAINER_ID).remove();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const headerBlock = new header(this.data, body);
		const mainTimelineBlock = new mainTimeline(this.data, body);
		const bgBlock = new bgVideo(body);
		const footerBlock = new footer(body);

		this.updateViewTypeToIntro();
		headerBlock.render();
		mainTimelineBlock.render();
		bgBlock.render();
		footerBlock.render();
	}
}