'use strict';

import { LAYOUT, TIMELINE } from '../../enums/elementHandlers';
import { timelineItem } from './timelineItem';

export class timeline {
	constructor(data, activeId) {
		this.data = data;
		this.activeId = activeId;
	}

	createTimelineContainer() {
		let timelineContainer = document.createElement('nav');
		timelineContainer.id = TIMELINE.TIMELINE_ID;

		return timelineContainer;
	}

	createEditionsListContainer() {
		let editionsListContainer = document.createElement('ul');
		editionsListContainer.classList.add(TIMELINE.EDITIONS_CLASS);

		return editionsListContainer;
	}

	reverseSortEditions() {
		return Object.keys(this.data).reverse();
	}

	render() {
		const revertedEditionsOrder = () => this.reverseSortEditions(this.data);
		let timelineContainer = this.createTimelineContainer();
		let editionsListContainer = this.createEditionsListContainer();

		revertedEditionsOrder().map((item) => {
			let edition = new timelineItem(this.data[item]);

			if(edition.editionId === this.activeId) {
				edition.render(editionsListContainer, true);
			} else {
				edition.render(editionsListContainer);
			}
		});

		timelineContainer.appendChild(editionsListContainer);
		return timelineContainer;
	}
}