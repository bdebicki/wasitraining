import { LAYOUT, HEADER } from '../enums/elementHandlers';
import VIEW_TYPES from '../enums/viewTypes';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Timeline from '../components/timeline/Timeline';
import BgVideo from '../components/bgVideo/BgVideo';
import Footer from '../components/footer/Footer';
import { updateViewType } from '../utils/updateView';

export default class IntroView {
	constructor(data) {
		this.data = data;
	}

	updateViewTypeToIntro() {
		updateViewType(VIEW_TYPES.INTRO);
	}

	switchToIntoView() {
		const titleBlock = new Title();
		const headerBlock = new Header();
		const timelineBlock = new Timeline(this.data, LAYOUT.MAIN_CONTAINER_ID);

		this.updateViewTypeToIntro();
		titleBlock.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		headerBlock.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		timelineBlock.renderMainTimeline();
		document.getElementById(LAYOUT.NAV_TIMELINE_ID).remove();
		document.getElementById(LAYOUT.YEAR_CONTAINER_ID).remove();
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const headerBlock = new Header(this.data, body);
		const timelineBlock = new Timeline(this.data, body);
		const bgBlock = new BgVideo(body);
		const footerBlock = new Footer(body);

		this.updateViewTypeToIntro();
		headerBlock.render();
		timelineBlock.renderMainTimeline();
		bgBlock.render();
		footerBlock.render();
	}
}
