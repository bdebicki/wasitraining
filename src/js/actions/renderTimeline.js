'use strict';

import { LAYOUT, TIMELINE } from '../enums/classes';
import { timelineEvent } from '../classes/timelineEvent';

export function renderTimeline(data, activeId) {
	const timelineContainer = document.createElement('nav');
	const editionsListContainer = document.createElement('ul');

	timelineContainer.id = TIMELINE.TIMELINE_ID;
	editionsListContainer.classList.add(TIMELINE.EDITIONS_CLASS);

	for(let editionId in data) {
		let edition = new timelineEvent(data[editionId]);

		if(edition.editionId == activeId) {
			edition.render(editionsListContainer, true);
		} else {
			edition.render(editionsListContainer);
		}
	}

	timelineContainer.appendChild(editionsListContainer);
	document.getElementById(LAYOUT.TOP_ID).appendChild(timelineContainer);
}