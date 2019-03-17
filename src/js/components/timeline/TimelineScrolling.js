import LAYOUT from '../../elementHandlers/layout';
import TIMELINE from './elementHandlers/timeline';

export default class TimelineScrolling {
	constructor() {
		this.timelineEl = document.getElementById(LAYOUT.MAIN_TIMELINE_ID);
		this.areaCoords = null;
		this.areaOffset = 20;
		this.areaSize = null;
		this.cursorPosition = null;
		this.editionsSize = null;
		this.editionsMinScroll = 0;
		this.editionsMaxScroll = null;
		this.editionsCurrentScroll = 0;
		this.editionsNewScroll = 0;
		this.editionsScrollDelta = 0;
		this.virtualAreaSize = null;
	}

	setScrollingData() {
		this.areaCoords = this.getAreaCoords();
		this.areaSize = this.getAreaSize();
		this.editionsSize = TimelineScrolling.getEditionsSize();
		this.editionsMaxScroll = this.getEditionMaxScroll();
		this.virtualAreaSize = this.getVirtualAreaSize();
	}

	handleScrolling = (e) => {
		const editionListEl = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);
		const newCursorPosition = TimelineScrolling.getCursorPosition(e);

		if (!this.hasCursorPositionChanged(newCursorPosition)) {
			return;
		}

		this.setCursorPosition(newCursorPosition);
		this.setTimelineScroll();
		editionListEl.style.transform = `translateX(-${this.editionsNewScroll}px)`;
	};

	hasCursorPositionChanged(cursorPosition) {
		const { x1, x2 } = this.areaCoords;
		const {
			editionsNewScroll,
			editionsMinScroll,
			editionsMaxScroll,
		} = this;

		return !(this.cursorPosition === cursorPosition
			|| (cursorPosition <= x1 && editionsNewScroll === editionsMinScroll)
			|| (cursorPosition >= x2 && editionsNewScroll === editionsMaxScroll)
		);
	}

	setTimelineScroll() {
		const {
			areaCoords,
			areaSize,
			cursorPosition,
			editionsMinScroll,
			editionsMaxScroll,
			editionsSize,
			virtualAreaSize,
		} = this;
		const { x1, x2 } = areaCoords;
		const editionsScroll = Math.round(
			((editionsSize - areaSize) * (cursorPosition - x1)) / virtualAreaSize
		);

		if (cursorPosition <= x1) { // while cursor is before beginning
			this.editionsNewScroll = editionsMinScroll;
		} else if (cursorPosition >= x2) { // while cursor is after timeline
			this.editionsNewScroll = editionsMaxScroll;
		} else {
			this.editionsNewScroll = editionsScroll;
		}

		this.getPositionDelta();
	}

	setInitialTimelineScroll(e) {
		this.handleScrolling(e);
	}

	setCursorPosition(newCursorPosition) {
		this.cursorPosition = newCursorPosition;
	}

	setCurrentScroll() {
		this.editionsCurrentScroll = this.editionsNewScroll;
	}

	getPositionDelta() {
		const { editionsCurrentScroll, editionsNewScroll } = this;

		if (editionsCurrentScroll === editionsNewScroll) {
			this.editionsScrollDelta = 0;
		} else if (editionsCurrentScroll > editionsNewScroll) {
			this.editionsScrollDelta = editionsCurrentScroll - editionsNewScroll;
		} else {
			this.editionsScrollDelta = editionsNewScroll - editionsCurrentScroll;
		}
	}

	setTimelineAnimation() {
		const { editionsScrollDelta } = this;
		const defaultAnimationTime = 0.2;
		const editionListEl = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);
		const transitionType = (time) => `transform ${time}s ease-out`;
		const animationTime = () => ((defaultAnimationTime * editionsScrollDelta) / 430).toFixed(2);
		const afterAnimation = () => { editionListEl.style.transition = transitionType(0); };

		editionListEl.addEventListener('transitionend', afterAnimation, null);

		editionListEl.style.transition = transitionType(animationTime());
	}

	static getCursorPosition(e) {
		return e.clientX;
	}

	getEditionMaxScroll() {
		const { editionsSize, areaSize } = this;
		return editionsSize - areaSize;
	}

	getAreaSize() {
		const { timelineEl } = this;

		return timelineEl.offsetWidth;
	}

	getAreaCoords() {
		const { timelineEl, areaOffset } = this;
		const { left, right } = timelineEl.getBoundingClientRect();
		const x1 = left + areaOffset;
		const x2 = right - areaOffset;

		return { x1, x2 };
	}

	getVirtualAreaSize() {
		const { areaOffset, areaSize } = this;

		return areaSize - (2 * areaOffset);
	}

	static getEditionsSize() {
		const editionsList = document.querySelectorAll(`.${TIMELINE.MAIN_EDITION_CLASS}`);
		const regularEditionsLenght = editionsList.length - 1; // because first one is wider than other
		const regularEditionWidth = editionsList[1].offsetWidth;
		const firstEditionWidth = editionsList[0].offsetWidth;

		return regularEditionsLenght * regularEditionWidth + firstEditionWidth;
	}
}
