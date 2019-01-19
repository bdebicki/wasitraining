import TIMELINE from './elementHandlers/timeline';
import LAYOUT from '../../elementHandlers/layout';
import addElement from '../../utils/addElement';
import TimelineItem from './TimelineItem';

export default class Timeline {
	constructor(data, editionId) {
		this.data = data;
		this.editionId = editionId;
		this.windowWidth = null;
	}

	reverseSortEditions() {
		const { data } = this;

		return data.reverse();
	}

	static updateSelectedEdition(newEdition) {
		// eslint-disable-next-line max-len
		document.querySelector(`.${TIMELINE.NAV_EDITION_ACTIVE_CLASS}`).classList.remove(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
		newEdition.classList.add(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
	}

	static createTimelineContainer(containerId) {
		const settings = {
			id: containerId,
		};

		return addElement('nav', settings);
	}

	static createEditionsListContainer(listClass) {
		const settings = {
			classNames: listClass,
		};

		return addElement('ul', settings);
	}

	static handleTimelineScroll(e) {
		document.getElementById(LAYOUT.MAIN_TIMELINE_ID)
			.style.left = `-${Timeline.calculateXPosition(e)}`;
	}

	static calculateXPosition(e) {
		const xPosition = (Timeline.getCursorPosition(e) * 100) / Timeline.getScreenWidth();

		return `${xPosition}%`;
	}

	static getCursorPosition(e) {
		return e.clientX;
	}

	static getScreenWidth() {
		return window.innerWidth;
	}

	renderNavTimeline() {
		const revertedEditionsOrder = this.reverseSortEditions();
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

		document.getElementById(LAYOUT.MAIN_CONTAINER_ID)
		// document.getElementById(LAYOUT.MAIN_TIMELINE_ID)
			.removeEventListener('mousemove', Timeline.handleTimelineScroll, null);

		return timelineContainer;
	}

	renderMainTimeline() {
		const revertedEditionsOrder = this.reverseSortEditions();
		const timelineContainer = Timeline.createTimelineContainer(LAYOUT.MAIN_TIMELINE_ID);
		const editionsListContainer = Timeline.createEditionsListContainer(TIMELINE.MAIN_EDITIONS_CLASS);

		revertedEditionsOrder.forEach((edition) => {
			const timelineItem = new TimelineItem(edition);

			editionsListContainer.appendChild(timelineItem.renderMainEdition());
		});

		timelineContainer.appendChild(editionsListContainer);

		document.getElementById(LAYOUT.MAIN_CONTAINER_ID)
		// document.getElementById(LAYOUT.MAIN_TIMELINE_ID)
			.addEventListener('mousemove', Timeline.handleTimelineScroll, null);

		return timelineContainer;
	}
}
