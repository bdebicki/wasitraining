import HEADER from '../components/header/elementHandlers/header';
import LAYOUT from '../elementHandlers/layout';
import VIEW_TYPES from '../enums/viewTypes';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Timeline from '../components/timeline/Timeline';
import BgVideo from '../components/bgVideo/BgVideo';
import Footer from '../components/footer/Footer';
import { updateViewType } from '../utils/updateView';
import pushElement from '../utils/pushElement';

export default class IntroView {
	constructor(data) {
		this.data = data;
	}

	static updateViewTypeToIntro() {
		updateViewType(VIEW_TYPES.INTRO);
	}

	switchToIntoView() {
		const bodyEl = `#${LAYOUT.MAIN_CONTAINER_ID}`;
		const timelineBlock = new Timeline(this.data);

		IntroView.updateViewTypeToIntro();
		Title.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		Header.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		pushElement(bodyEl, timelineBlock.renderMainTimeline());
		document.getElementById(LAYOUT.NAV_TIMELINE_ID).remove();
		document.getElementById(LAYOUT.YEAR_CONTAINER_ID).remove();
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
	}
}
