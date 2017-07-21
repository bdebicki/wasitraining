'use strict';

import { timelineEvent } from './timelineEvent';
// import { edition } from './edition';

export function renderTimeline(data) {
	const timelineContainer = document.createElement('nav');

	for(let editionData of data) {
		let edition = new timelineEvent(editionData);
		edition.render();
	}
}

