'use strict';

import { LAYOUT, TIMELINE } from '../../enums/elementHandlers';
import { timelineItem } from './timelineItem';

function sortEditions(list) {
	return Object.keys(list).reverse();
}

export function renderTimeline(target, data, activeId) {
	const timelineContainer = document.createElement('nav');
	const editionsListContainer = document.createElement('ul');
	const revertedEditionsOrder = () => sortEditions(data);

	timelineContainer.id = TIMELINE.TIMELINE_ID;
	editionsListContainer.classList.add(TIMELINE.EDITIONS_CLASS);

	revertedEditionsOrder().map((item) => {
		let edition = new timelineItem(data[item]);

		if(edition.editionId == activeId) {
			edition.render(editionsListContainer, true);
		} else {
			edition.render(editionsListContainer);
		}
	});

	timelineContainer.appendChild(editionsListContainer);
	target.appendChild(timelineContainer);
}