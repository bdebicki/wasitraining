'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { VIEW_TYPES } from '../enums/viewTypes';
import { edition } from '../classes/edition';
import { header } from '../components/header/header';
import { timeline } from '../components/timeline/timeline';
import { yearDetails } from '../components/yearDetails/yearDetails'
import { footer } from '../components/footer/footer';
import { updateViewType } from '../utils/updateView';

export class yearView {
	constructor(data, editionId) {
		this.data = data;
		this.editionId = editionId;
	}

	updateViewTypeToYear() {
		updateViewType(VIEW_TYPES.YEAR);
	}

	switchToYearView() {
		const yearBlock = new yearDetails(this.data[this.editionId], LAYOUT.MAIN_CONTAINER_ID);

		this.updateViewTypeToYear();
		document.getElementById(LAYOUT.TOP_ID).appendChild(document.getElementById(LAYOUT.TIMELINE_ID));
		yearBlock.render();
	}

	decorateRainDetails(details) {
		let fragment = document.createDocumentFragment();

		document.getElementById(RAIN.EDITION_RAIN_DETAILS_ID).textContent =''; // to clear rain details list

		details.map((item) => {
			const li = document.createElement('li');
			const rain = item.rain ? 'rain' : 'no rain';
			li.textContent = `${item.day} ${rain}`;

			fragment.appendChild(li);
		});

		return fragment;
	}

	decorateEditionHeadliners(headliners) { // exported
		let fragment = document.createDocumentFragment();

		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).textContent =''; // to clear rain details list

		headliners.map((item) => {
			const li = document.createElement('li');

			li.textContent = item;
			fragment.appendChild(li);
		});

		return fragment;
	}

	decorateEditionDates(dates) {
		if (Object.keys(dates).length === 1) {
			return dates.firstDay;
		} else {
			return `${dates.firstDay} - ${dates.lastDay}`;
		}
	}

	updateDetails() {
		const newEdition = new edition(this.data);

		document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = newEdition.editionYear;
		document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = this.decorateEditionDates(newEdition.editionDate);
		document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = newEdition.editionFullName;
		document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = newEdition.editionPlace;
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).appendChild(this.decorateEditionHeadliners(newEdition.headliners));
		document.querySelector(`.${RAIN.RAIN_CLASS}`).textContent = newEdition.editionRain;
		document.getElementById(RAIN.EDITION_RAIN_DETAILS_ID).appendChild(this.decorateRainDetails(newEdition.editionDetails));
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const data = this.data;
		const headerBlock = new header(data, body);
		const timelineBlock = new timeline(data, LAYOUT.TOP_ID);
		const yearBlock = new yearDetails(data[this.activeId], body);
		const footerBlock = new footer(body);

		this.updateViewTypeToYear();

		headerBlock.render();
		timelineBlock.render();
		yearBlock.render();
		footerBlock.render();
	}
}