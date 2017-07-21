'use strict';

import { LAYOUT, TIMELINE } from '../enums/classes';
import { timelineEvent } from './timelineEvent';

export function renderTimeline(data) {
	const timelineContainer = document.createElement('nav');
	const editionsListContainer = document.createElement('ul');

	timelineContainer.id = TIMELINE.TIMELINE_ID;
	editionsListContainer.classList.add(TIMELINE.EDITIONS_CLASS);

	for(let [i, editionData] of data.entries()) {
		let edition = new timelineEvent(editionData);

		if(i === 0) {
			edition.render(editionsListContainer, true);
		} else {
			edition.render(editionsListContainer);
		}
	}

	timelineContainer.appendChild(editionsListContainer);
	document.getElementById(LAYOUT.TOP_ID).appendChild(timelineContainer);
}

