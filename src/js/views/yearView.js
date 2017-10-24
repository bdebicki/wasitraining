'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
import { yearDetails } from '../components/yearDetails/yearDetails'
import { footer } from '../components/footer/footer';

export class yearView {
	constructor(data, activeId) {
		this.data = data;
		this.activeId = activeId;
	}

	switchToYearView() {
		console.log('update view to year');
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const activeEdition = Object.keys(this.data).length;
		const headerBlock = new header(this.data, body);
		const timelineBlock = new timeline(this.data, LAYOUT.TOP_ID);
		const yearBlock = new yearDetails(this.data[activeEdition], body);
		const footerBlock = new footer(body);

		headerBlock.render();
		timelineBlock.render();
		yearBlock.render();
		footerBlock.render();
	}
}