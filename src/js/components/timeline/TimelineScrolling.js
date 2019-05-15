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
		this.editionsMinShift = 0;
		this.editionsMaxShift = null;
		this.editionsCurrentShift = 0;
		this.editionsNewShift = 0;
		this.editionsShiftDelta = 0;
		this.virtualAreaSize = null;
	}

	setScrollingData() {
		this.areaCoords = this.getAreaCoords();
		this.areaSize = this.getAreaSize();
		this.editionsSize = TimelineScrolling.getEditionsSize();
		this.editionsMaxShift = this.getEditionMaxShift();
		this.virtualAreaSize = this.getVirtualAreaSize();
	}

	handleScrolling = (e) => {
		const editionListEl = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);
		const newCursorPosition = TimelineScrolling.getCursorPosition(e);

		if (!this.hasCursorPositionChanged(newCursorPosition)) {
			return;
		}

		this.setCursorPosition(newCursorPosition);
		this.setTimelineShift();
		editionListEl.style.transform = `translateX(-${this.editionsNewShift}px)`;
	};

	hasCursorPositionChanged(cursorPosition) {
		const { x1, x2 } = this.areaCoords;
		const {
			editionsNewShift,
			editionsMinShift,
			editionsMaxShift,
		} = this;

		return !(this.cursorPosition === cursorPosition
			|| (cursorPosition <= x1 && editionsNewShift === editionsMinShift)
			|| (cursorPosition >= x2 && editionsNewShift === editionsMaxShift)
		);
	}

	setTimelineShift() {
		const {
			areaCoords,
			areaSize,
			cursorPosition,
			editionsMinShift,
			editionsMaxShift,
			editionsSize,
			virtualAreaSize,
		} = this;
		const { x1, x2 } = areaCoords;
		const editionsShift = Math.round(
			((editionsSize - areaSize) * (cursorPosition - x1)) / virtualAreaSize
		);

		if (cursorPosition <= x1) { // while cursor is before beginning
			this.editionsNewShift = editionsMinShift;
		} else if (cursorPosition >= x2) { // while cursor is after timeline
			this.editionsNewShift = editionsMaxShift;
		} else {
			this.editionsNewShift = editionsShift;
		}

		this.getShiftDelta();
	}

	setInitialTimelineShift(e) {
		this.handleScrolling(e);
	}

	setCursorPosition(newCursorPosition) {
		this.cursorPosition = newCursorPosition;
	}

	setCurrentShift() { // bez tego działa poprawnie
		this.editionsCurrentShift = this.editionsNewShift;
	}

	getShiftDelta() {
		const { editionsCurrentShift, editionsNewShift } = this;

		if (editionsCurrentShift === editionsNewShift) {
			this.editionsShiftDelta = 0;
		} else if (editionsCurrentShift > editionsNewShift) {
			this.editionsShiftDelta = editionsCurrentShift - editionsNewShift;
		} else {
			this.editionsShiftDelta = editionsNewShift - editionsCurrentShift;
		}
	}

	setTimelineAnimation() {
		const { editionsShiftDelta } = this;
		const defaultAnimationTime = 0.2;
		const editionListEl = document.querySelector(`.${TIMELINE.MAIN_EDITIONS_CLASS}`);
		const transitionType = (time) => `transform ${time}s ease-out`;
		const animationTime = () => ((defaultAnimationTime * editionsShiftDelta) / 430).toFixed(2);
		// const correctedAnimationTime = () => (animationTime() < 0.1) ? 0.1 : animationTime;
		const afterAnimation = () => { editionListEl.style.transition = transitionType(0); };

		editionListEl.addEventListener('transitionend', afterAnimation, null);

		editionListEl.style.transition = transitionType(animationTime());
	}

	static getCursorPosition(e) {
		return e.clientX;
	}

	getEditionMaxShift() {
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
