'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
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
		this.updateViewTypeToIntro();
		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).appendChild(document.getElementById(LAYOUT.TIMELINE_ID));
		document.getElementById(LAYOUT.YEAR_CONTAINER_ID).remove();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const headerBlock = new header(this.data, body);
		const timelineBlock = new timeline(this.data, body);
		const footerBlock = new footer(body);

		this.updateViewTypeToIntro();

		headerBlock.render();
		timelineBlock.render();
		footerBlock.render();
	}
}