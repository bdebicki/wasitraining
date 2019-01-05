import HEADER from '../components/header/elementHandlers/header';
import LAYOUT from '../elementHandlers/layout';
import VIEW_TYPES from '../enums/viewTypes';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Timeline from '../components/timeline/Timeline';
import YearDetails from '../components/yearDetails/YearDetails';
import RainDetails from '../components/yearDetails/RainDetails';
import BgCover from '../components/background/BgCover';
import BgVideo from '../components/background/BgVideo';
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
		const rainBlock = new RainDetails(newEditionData);

		Timeline.updateSelectedEdition(newEdition);
		yearBlock.updateYearDetails();
		rainBlock.updateBgCoverByRainMask();
	}

	switchToYearView() {
		const { data, editionId, editionIndex } = this;
		const editionData = data[editionIndex];
		const bodyEl = `#${LAYOUT.MAIN_CONTAINER_ID}`;
		const headerEl = `#${LAYOUT.HEADER_ID}`;
		const timelineBlock = new Timeline(data, editionId);
		const yearBlock = new YearDetails(editionData);
		const rainBlock = new RainDetails(editionData);

		YearView.updateViewTypeToYear();
		Title.updateTitleLocation(document.querySelector(`.${HEADER.TITLE_CLASS}`));
		Header.updateHeaderLocation(document.getElementById(LAYOUT.HEADER_ID));
		pushElement(headerEl, timelineBlock.renderNavTimeline());
		pushElement(bodyEl, [yearBlock.render(), BgCover.render()]);
		document.getElementById(LAYOUT.MAIN_TIMELINE_ID).remove();
		rainBlock.decorateBgCoverByRainMask();
	}

	render() {
		const { data, editionId, editionIndex } = this;
		const editionData = data[editionIndex];
		const bodyEl = `#${LAYOUT.MAIN_CONTAINER_ID}`;
		const headerEl = `#${LAYOUT.HEADER_ID}`;
		const timelineBlock = new Timeline(data, editionId);
		const yearBlock = new YearDetails(editionData);
		const rainBlock = new RainDetails(editionData);

		YearView.updateViewTypeToYear();
		pushElement(bodyEl, [
			Header.render(),
			yearBlock.render(),
			BgCover.render(),
			BgVideo.render(),
			Footer.render(),
		]);
		pushElement(headerEl, timelineBlock.renderNavTimeline());
		rainBlock.decorateBgCoverByRainMask();
	}
}
