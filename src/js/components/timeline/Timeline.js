import TIMELINE from './elementHandlers/timeline';
import LAYOUT from '../../elementHandlers/layout';
import TimelineItem from './TimelineItem';

export default class Timeline {
	constructor(data, editionId) {
		this.data = data;
		this.editionId = editionId;
	}

	get reverseSortEditions() {
		return this.data.reverse();
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

	renderNavTimeline() {
		const revertedEditionsOrder = this.reverseSortEditions;
		const timelineContainer = Timeline.createTimelineContainer(LAYOUT.NAV_TIMELINE_ID);
		const editionsListContainer = Timeline.createEditionsListContainer(TIMELINE.NAV_EDITIONS_CLASS);

		revertedEditionsOrder.forEach((edition) => {
			const editionData = edition;
			const timelineItem = new TimelineItem(editionData);

			if (editionData.id === this.editionId) {
				editionsListContainer.appendChild(timelineItem.renderNavEdition(true));
			} else {
				editionsListContainer.appendChild(timelineItem.renderNavEdition());
			}
		});

		timelineContainer.appendChild(editionsListContainer);

		return timelineContainer;
	}

	renderMainTimeline() {
		const revertedEditionsOrder = this.reverseSortEditions;
		const timelineContainer = Timeline.createTimelineContainer(LAYOUT.MAIN_TIMELINE_ID);
		const editionsListContainer = Timeline.createEditionsListContainer(TIMELINE.MAIN_EDITIONS_CLASS);

		revertedEditionsOrder.forEach((edition) => {
			const timelineItem = new TimelineItem(edition);

			editionsListContainer.appendChild(timelineItem.renderMainEdition());
		});

		timelineContainer.appendChild(editionsListContainer);

		return timelineContainer;
	}
}
