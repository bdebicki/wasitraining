'use strict';

import { LAYOUT, TIMELINE } from '../../enums/elementHandlers';
import { reverseSortEditions } from '../../utils/sortEditions';
import { timelineItem } from './timelineItem';

export class mainTimeline {
	constructor(data, target) {
		this.data = data;
		this.target = target;
	}

	createTimelineContainer() {
		let timelineContainer = document.createElement('nav');

		timelineContainer.id = LAYOUT.MAIN_TIMELINE_ID;

		return timelineContainer;
	}

	createEditionsListContainer() {
		let editionsListContainer = document.createElement('ul');

		editionsListContainer.classList.add(TIMELINE.MAIN_EDITIONS_CLASS);

		return editionsListContainer;
	}

	render() {
		const revertedEditionsOrder = () => reverseSortEditions(this.data);
		let timelineContainer = this.createTimelineContainer();
		let editionsListContainer = this.createEditionsListContainer();

		revertedEditionsOrder().map((item) => {
			let edition = new timelineItem(this.data[item]);

			editionsListContainer.appendChild(edition.renderMainEdition());
		});

		timelineContainer.appendChild(editionsListContainer);
		document.getElementById(this.target).appendChild(timelineContainer);
	}
}