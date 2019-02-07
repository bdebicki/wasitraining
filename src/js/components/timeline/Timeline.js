import TIMELINE from './elementHandlers/timeline';
import LAYOUT from '../../elementHandlers/layout';
import addElement from '../../utils/addElement';
import TimelineItem from './TimelineItem';

export default class Timeline {
	constructor(data, editionId) {
		this.data = data;
		this.editionId = editionId;
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

	// static handleTimelineScroll(e) {
	// 	const timelineScrolledPosition = Timeline.calculateXPosition(e);
	// 	const { timelineStart, timelineEnd } = Timeline.getTimelineOffset();
	// 	const cursorPosition = Timeline.getCursorPosition(e);
	// 	const timeline = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);
	// 	const maxOffset = Timeline.getEditionsWidth() - document.getElementById(LAYOUT.MAIN_TIMELINE_ID).offsetWidth;
	//
	// 	const setPosition = setTimeout(() => {
	// 		if (cursorPosition <= 0) { // while cursor is before beginning
	// 			clearTimeout(setPosition);
	// 			timeline.style.transform = 'translateX(0)';
	// 		} else if (cursorPosition >= (timelineEnd - timelineStart - 1)) { // while cursor is after timeline
	// 			clearTimeout(setPosition);
	// 			timeline.style.transform = `translateX(-${maxOffset}px)`;
	// 		} else {
	// 			timeline.style.transform = `translateX(-${timelineScrolledPosition}px)`;
	// 		}
	// 	}, 30, true);
	//
	// 	setPosition; // eslint-disable-line no-unused-expressions
	// }
	//
	// static calculateXPosition(e) {
	// 	const cursorPosition = Timeline.getCursorPosition(e);
	// 	const timelineContainerWidth = document.getElementById(LAYOUT.MAIN_TIMELINE_ID).offsetWidth;
	// 	const editionsWidth = Timeline.getEditionsWidth() - timelineContainerWidth;
	// 	const xPosition = Math.round((editionsWidth * cursorPosition) / timelineContainerWidth);
	//
	// 	return xPosition;
	// }
	//
	// static getEditionsWidth() {
	// 	const editionsList = document.querySelectorAll(`.${TIMELINE.MAIN_EDITION_CLASS}`);
	// 	const editionsLenght = editionsList.length;
	// 	const editionWidth = editionsList[1].offsetWidth; // first one has extra border on left
	// 	const beginningBorderSize = 1;
	//
	// 	return editionsLenght * editionWidth + beginningBorderSize;
	// }
	//
	// static getCursorPosition(e) {
	// 	return e.clientX - Timeline.getTimelineOffset().timelineStart;
	// }
	//
	// static getTimelineOffset() {
	// 	const { left, right } = document.getElementById(LAYOUT.MAIN_TIMELINE_ID).getBoundingClientRect();
	//
	// 	return { timelineStart: left, timelineEnd: right };
	// }

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

		return timelineContainer;
	}
}
