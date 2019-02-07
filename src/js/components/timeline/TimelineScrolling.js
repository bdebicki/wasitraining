import LAYOUT from '../../elementHandlers/layout';
import TIMELINE from './elementHandlers/timeline';

export default class TimelineScrolling {
	constructor() {
		this.timelineEl = document.getElementById(LAYOUT.MAIN_TIMELINE_ID);
		this.areaCoords = this.getAreaCoords();
		this.areaSize = this.getAreaSize();
		this.editionsSize = TimelineScrolling.getEditionsSize();
		this.handleScrolling = this.handleScrolling.bind(this);
	}

	updateScrollingData() {

	}

	handleScrolling(e) {
		const editionListEl = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);
		const { x1, x2 } = this.areaCoords;
		const cursorPosition = TimelineScrolling.getCursorPosition(e);

		if (cursorPosition >= x1 && cursorPosition <= x2) {
			editionListEl.style.transform = `translateX(-${this.setTimelineScroll(e)}px)`;
		}
	}

	setTimelineScroll(e) {
		const { areaSize, editionsSize } = this;
		const cursorPosition = TimelineScrolling.getCursorPosition(e) - this.areaCoords.x1;

		return Math.round(((editionsSize - areaSize) * cursorPosition) / areaSize);
	}

	static getCursorPosition(e) {
		return e.clientX;
	}

	getAreaSize() {
		const { timelineEl } = this;

		return timelineEl.offsetWidth;
	}

	getAreaCoords() {
		const { timelineEl } = this;
		const { left, right } = timelineEl.getBoundingClientRect();

		return { x1: left, x2: right };
	}

	static getEditionsSize() {
		const editionsList = document.querySelectorAll(`.${TIMELINE.MAIN_EDITION_CLASS}`);
		const regularEditionsLenght = editionsList.length - 1; // because first one is wider than other
		const regularEditionWidth = editionsList[1].offsetWidth;
		const firstEditionWidth = editionsList[0].offsetWidth;

		return regularEditionsLenght * regularEditionWidth + firstEditionWidth;
	}
}
