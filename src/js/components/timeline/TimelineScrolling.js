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
		// this.editionsCurrentScroll = null;
		this.editionsNewScroll = null;
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

		this.setCursorPosition(e);
		this.setTimelineScroll();
		editionListEl.style.transform = `translateX(-${this.editionsNewScroll}px)`;
	};

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
	}

	setInitialTimelineScroll(e) {
		this.handleScrolling(e);
	}

	setCursorPosition(e) {
		const newCursorPosition = TimelineScrolling.getCursorPosition(e);
		const { x1, x2 } = this.areaCoords;
		const {
			editionsNewScroll,
			editionsMinScroll,
			editionsMaxScroll,
		} = this;

		if (this.cursorPosition === newCursorPosition
			|| (newCursorPosition <= x1 && editionsNewScroll === editionsMinScroll)
			|| (newCursorPosition >= x2 && editionsNewScroll === editionsMaxScroll)
		) {
			return;
		}

		this.cursorPosition = newCursorPosition;
	}

	// getPositionDelta() {
	// 	const { editionsCurrentScroll, editionsNewScroll } = this;
	//
	// 	if (editionsCurrentScroll === editionsNewScroll) {
	// 		return 0;
	// 	}
	//
	// 	if (editionsCurrentScroll > editionsNewScroll) {
	// 		return editionsCurrentScroll - editionsNewScroll;
	// 	}
	//
	// 	return editionsNewScroll - editionsCurrentScroll;
	// }

	setTimelineAnimation() {
		const { editionsNewScroll } = this;
		const defaultAnimationTime = 0.2;
		const editionListEl = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);
		const transitionType = (time) => `transform ${time}s ease-out`;
		const animationTime = () => ((defaultAnimationTime * editionsNewScroll) / 430).toFixed(2);
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
