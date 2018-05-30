import { LAYOUT, HEADER } from '../enums/elementHandlers';
import VIEW_TYPES from '../enums/viewTypes';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Timeline from '../components/timeline/Timeline';
import YearDetails from '../components/yearDetails/YearDetails';
import BgVideo from '../components/bgVideo/BgVideo';
import Footer from '../components/footer/Footer';
import { updateViewType } from '../utils/updateView';

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
		const yearBlock = new YearDetails(this.data[this.editionIndex], LAYOUT.MAIN_CONTAINER_ID);
		const timelineBlock = new Timeline(this.data, LAYOUT.HEADER_ID, this.editionId);

		YearView.updateViewTypeToYear();
		Title.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		Header.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		timelineBlock.renderNavTimeline();
		yearBlock.render();
		document.getElementById(LAYOUT.MAIN_TIMELINE_ID).remove();
	}

	render() {
		const { data, editionId, editionIndex } = this;
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const headerBlock = new Header(data, body);
		const timelineBlock = new Timeline(data, LAYOUT.HEADER_ID, editionId);
		const yearBlock = new YearDetails(data[editionIndex], body);
		const bgBlock = new BgVideo(body);
		const footerBlock = new Footer(body);

		YearView.updateViewTypeToYear();
		headerBlock.render();
		timelineBlock.renderNavTimeline();
		yearBlock.render();
		bgBlock.render();
		footerBlock.render();
	}
}
