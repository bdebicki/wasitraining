'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
import { yearDetails } from '../components/yearDetails/yearDetails'
import { footer } from '../components/footer/footer';
import { updateViewType } from '../utils/updateView';

export class yearView {
	constructor(data, activeId) {
		this.data = data;
		this.activeId = activeId;
	}

	updateViewToYear() {
		updateViewType(VIEW_TYPES.YEAR);
	}

	switchToYearView() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const headerBlock = document.getElementById(LAYOUT.TOP_ID);
		const timelineBlock = document.getElementById(LAYOUT.TIMELINE_ID);

		this.updateViewToYear();
		headerBlock.appendChild(timelineBlock);
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const activeEdition = Object.keys(this.data).length;
		const headerBlock = new header(this.data, body);
		const timelineBlock = new timeline(this.data, LAYOUT.TOP_ID);
		const yearBlock = new yearDetails(this.data[activeEdition], body);
		const footerBlock = new footer(body);

		this.updateViewToYear();

		headerBlock.render();
		timelineBlock.render();
		yearBlock.render();
		footerBlock.render();
	}
}