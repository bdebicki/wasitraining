'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
import { footer } from '../components/footer/footer';

export class introView {
	constructor(data) {
		this.data = data
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const headerBlock = new header(this.data, body);
		const timelineBlock = new timeline(this.data, body);
		const footerBlock = new footer(body);

		headerBlock.render();
		timelineBlock.render();
		footerBlock.render();
	}
}