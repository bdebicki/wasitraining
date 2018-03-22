import { LAYOUT, TIMELINE } from '../../enums/elementHandlers';
import TimelineItem from './TimelineItem';

export default class Timeline {
	constructor(data, target, editionId) {
		this.data = data;
		this.target = target;
		this.editionId = editionId;
	}

	static updateSelectedEdition(newEdition) {
		// eslint-disable-next-line max-len
		document.querySelector(`.${TIMELINE.NAV_EDITION_ACTIVE_CLASS}`).classList.remove(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
		newEdition.classList.add(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
	}

	static createTimelineContainer(containerId) {
		const timelineContainer = document.createElement('nav');

		timelineContainer.id = containerId;

		return timelineContainer;
	}

	static createEditionsListContainer(listClass) {
		const editionsListContainer = document.createElement('ul');

		editionsListContainer.classList.add(listClass);

		return editionsListContainer;
	}

	reverseSortEditions() {
		return Object.keys(this.data).reverse();
	}

	renderNavTimeline() {
		const revertedEditionsOrder = () => this.reverseSortEditions();
		const timelineContainer = Timeline.createTimelineContainer(LAYOUT.NAV_TIMELINE_ID);
		const editionsListContainer = Timeline.createEditionsListContainer(TIMELINE.NAV_EDITIONS_CLASS);

		revertedEditionsOrder().map((item) => {
			const edition = new TimelineItem(this.data[item]);

			if (this.data[item].id === this.editionId) {
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
		const timelineContainer = Timeline.createTimelineContainer(LAYOUT.MAIN_TIMELINE_ID);
		const editionsListContainer = Timeline.createEditionsListContainer(TIMELINE.MAIN_EDITIONS_CLASS);

		revertedEditionsOrder().map((item) => {
			const edition = new TimelineItem(this.data[item]);

			editionsListContainer.appendChild(edition.renderMainEdition());
		});

		timelineContainer.appendChild(editionsListContainer);
		document.getElementById(this.target).appendChild(timelineContainer);
	}
}
