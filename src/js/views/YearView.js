import HEADER from '../components/header/elementHandlers/header';
import LAYOUT from '../elementHandlers/layout';
import VIEW_TYPES from '../enums/viewTypes';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Timeline from '../components/timeline/Timeline';
import YearDetails from '../components/yearDetails/YearDetails';
import BgVideo from '../components/bgVideo/BgVideo';
import Footer from '../components/footer/Footer';
import { updateViewType } from '../utils/updateView';
import pushElement from '../utils/pushElement';

export default class YearView {
	constructor(data, editionId) {
		this.data = data;
		this.editionId = editionId;
		this.editionIndex = editionId - 1;
	}

	static updateViewTypeToYear() {
		updateViewType(VIEW_TYPES.YEAR);
	}

	updateDetails(newEdition) {
		const newEditionData = this.data[this.editionIndex];
		const yearBlock = new YearDetails(newEditionData);

		Timeline.updateSelectedEdition(newEdition);
		yearBlock.updateYearDetails();
	}

	switchToYearView() {
		const bodyEl = `#${LAYOUT.MAIN_CONTAINER_ID}`;
		const headerEl = `#${LAYOUT.HEADER_ID}`;
		const timelineBlock = new Timeline(this.data, this.editionId);
		const yearBlock = new YearDetails(this.data[this.editionIndex]);

		YearView.updateViewTypeToYear();
		Title.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		Header.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		pushElement(headerEl, timelineBlock.renderNavTimeline());
		pushElement(bodyEl, yearBlock.render());
		document.getElementById(LAYOUT.MAIN_TIMELINE_ID).remove();
	}

	render() {
		const { data, editionId, editionIndex } = this;
		const bodyEl = `#${LAYOUT.MAIN_CONTAINER_ID}`;
		const headerEl = `#${LAYOUT.HEADER_ID}`;
		const timelineBlock = new Timeline(data, editionId);
		const yearBlock = new YearDetails(data[editionIndex]);

		YearView.updateViewTypeToYear();
		pushElement(bodyEl, [
			Header.render(),
			yearBlock.render(),
			BgVideo.render(),
			Footer.render(),
		]);
		pushElement(headerEl, timelineBlock.renderNavTimeline());
	}
}
