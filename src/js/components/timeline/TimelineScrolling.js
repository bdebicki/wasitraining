import LAYOUT from '../../elementHandlers/layout';
import TIMELINE from './elementHandlers/timeline';

export default class TimelineScrolling {
	constructor() {
		this.timelineEl = document.getElementById(LAYOUT.MAIN_TIMELINE_ID);
		this.areaCoords = this.getAreaCoords();
		this.areaSize = this.getAreaSize();
		this.editionsSize = TimelineScrolling.getEditionsSize();
		this.editionsMinScroll = 0;
		this.editionsMaxScroll = this.editionsSize - this.areaSize;
		this.editionsCurrentScroll = null;
		this.cursorPosition = null;
		this.handleScrolling = this.handleScrolling.bind(this);
	}

	updateScrollingData() {

	}

	handleScrolling(e) {
		const editionListEl = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);

		this.handleCursorMove(e);
		this.setTimelineScroll();
		editionListEl.style.transform = `translateX(-${this.editionsCurrentScroll}px)`;
	}

	handleCursorMove(e) {
		this.setCursorPosition(e);
	}

	setTimelineScroll() {
		const {
			areaCoords,
			areaSize,
			cursorPosition,
			editionsMinScroll,
			editionsMaxScroll,
			editionsSize,
		} = this;
		const { x1, x2 } = areaCoords;
		const editionsScroll = Math.round(((editionsSize - areaSize) * (cursorPosition - x1)) / areaSize);

		if (cursorPosition <= x1) { // while cursor is before beginning
			this.editionsCurrentScroll = editionsMinScroll;
		} else if (cursorPosition >= x2) { // while cursor is after timeline
			this.editionsCurrentScroll = editionsMaxScroll;
		} else {
			this.editionsCurrentScroll = editionsScroll;
		}
	}

	setCursorPosition(e) {
		const newCursorPosition = TimelineScrolling.getCursorPosition(e);
		const { x1, x2 } = this.areaCoords;
		const {
			editionsCurrentScroll,
			editionsMinScroll,
			editionsMaxScroll,
		} = this;

		if (this.cursorPosition === newCursorPosition
			|| (newCursorPosition <= x1 && editionsCurrentScroll === editionsMinScroll)
			|| (newCursorPosition >= x2 && editionsCurrentScroll === editionsMaxScroll)
		) {
			return;
		}

		this.cursorPosition = newCursorPosition;
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
