import HEADER from '../components/header/elementHandlers/header';
import LAYOUT from '../elementHandlers/layout';
import VIEW_TYPES from '../enums/viewTypes';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Timeline from '../components/timeline/Timeline';
import TimelineScrolling from '../components/timeline/TimelineScrolling';
import BgVideo from '../components/background/BgVideo';
import Footer from '../components/footer/Footer';
import RainDetails from '../components/yearDetails/RainDetails';
import { getViewType, updateViewType } from '../utils/updateView';
import pushElement from '../utils/pushElement';

export default class IntroView {
	constructor(data) {
		this.data = data;
	}

	static updateViewTypeToIntro() {
		updateViewType(VIEW_TYPES.INTRO);
	}

	static handleTimelineScrollingEvents(scope) {
		const isIntroView = () => getViewType() === VIEW_TYPES.INTRO;

		const handleTimelineScrollingEvents = (e) => {
			if (!isIntroView()) {
				window.removeEventListener('mousemove', handleTimelineScrollingEvents, null);

				return;
			}

			scope.handleScrolling(e);
		};
		const handleWindowInEvent = () => {
			if (!isIntroView()) {
				document.removeEventListener('mouseenter', handleWindowInEvent, null);

				return;
			}

			scope.setTimelineAnimation();
		};
		const handleWindowOutEvent = () => {
			if (!isIntroView()) {
				document.removeEventListener('mouseleave', handleWindowOutEvent, null);

				return;
			}

			scope.setCurrentShift();
		};
		const handleTimelineUpdateScrollingEvents = () => {
			if (!isIntroView()) {
				window.removeEventListener('resize', handleTimelineUpdateScrollingEvents, null);

				return;
			}

			scope.setScrollingData();
		};

		document.addEventListener('mouseleave', handleWindowOutEvent, null);
		document.addEventListener('mouseenter', handleWindowInEvent, null);
		window.addEventListener('mousemove', handleTimelineScrollingEvents, null);
		window.addEventListener('resize', handleTimelineUpdateScrollingEvents, null);
	}

	switchToIntoView(e) {
		const bodyEl = `#${LAYOUT.MAIN_CONTAINER_ID}`;
		const timelineBlock = new Timeline(this.data);

		IntroView.updateViewTypeToIntro();
		Title.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		Header.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		pushElement(bodyEl, timelineBlock.renderMainTimeline());
		document.getElementById(LAYOUT.NAV_TIMELINE_ID).remove();
		document.getElementById(LAYOUT.YEAR_CONTAINER_ID).remove();
		document.getElementById(LAYOUT.BG_COVER_ID).remove();

		window.removeEventListener('resize', RainDetails.updateBgCoverRainMaskPosition, null);

		const timelineScrolling = new TimelineScrolling();
		timelineScrolling.setScrollingData();
		timelineScrolling.setInitialTimelineShift(e);

		IntroView.handleTimelineScrollingEvents(timelineScrolling);
	}

	render() {
		const bodyEl = `#${LAYOUT.MAIN_CONTAINER_ID}`;
		const timelineBlock = new Timeline(this.data);

		IntroView.updateViewTypeToIntro();
		pushElement(bodyEl, [
			Header.render(),
			timelineBlock.renderMainTimeline(),
			BgVideo.render(),
			Footer.render(),
		]);

		const timelineScrolling = new TimelineScrolling();
		timelineScrolling.setScrollingData();
		timelineScrolling.setTimelineAnimation();

		IntroView.handleTimelineScrollingEvents(timelineScrolling);
	}
}
