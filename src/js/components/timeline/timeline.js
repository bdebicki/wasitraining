'use strict';

import { LAYOUT, TIMELINE } from '../../enums/elementHandlers';
import { timelineItem } from './timelineItem';

export class timeline {
	constructor(data, target, editionId) {
		this.data = data;
		this.target = target;
		this.editionId = editionId;
	}

	updateSelectedEdition(newEdition) {
		document.querySelector(`.${TIMELINE.NAV_EDITION_ACTIVE_CLASS}`).classList.remove(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
		newEdition.classList.add(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
	}

	createTimelineContainer(containerId) {
		let timelineContainer = document.createElement('nav');

		timelineContainer.id = containerId;

		return timelineContainer;
	}

	createEditionsListContainer(listClass) {
		let editionsListContainer = document.createElement('ul');

		editionsListContainer.classList.add(listClass);

		return editionsListContainer;
	}

	reverseSortEditions() {
		return Object.keys(this.data).reverse();
	}

	renderNavTimeline() {
		const revertedEditionsOrder = () => this.reverseSortEditions();
		let timelineContainer = this.createTimelineContainer(LAYOUT.NAV_TIMELINE_ID);
		let editionsListContainer = this.createEditionsListContainer(TIMELINE.NAV_EDITIONS_CLASS);

		revertedEditionsOrder().map((item) => {
			const edition = new timelineItem(this.data[item]);

			if(this.data[item].id === this.editionId) {
				editionsListContainer.appendChild(edition.renderNavEdition(true));
			} else {
				editionsListContainer.appendChild(edition.renderNavEdition());
			}
		});

		timelineContainer.appendChild(editionsListContainer);
		document.getElementById(this.target).appendChild(timelineContainer);
	}

	renderMainTimeline() {
		const revertedEditionsOrder = () => this.reverseSortEditions(this.data);
		let timelineContainer = this.createTimelineContainer(LAYOUT.MAIN_TIMELINE_ID);
		let editionsListContainer = this.createEditionsListContainer(TIMELINE.MAIN_EDITIONS_CLASS);

		revertedEditionsOrder().map((item) => {
			let edition = new timelineItem(this.data[item]);

			editionsListContainer.appendChild(edition.renderMainEdition());
		});

		timelineContainer.appendChild(editionsListContainer);
		document.getElementById(this.target).appendChild(timelineContainer);
	}
}