'use strict';

import {DIALOGBOX, EDITION, LINK} from '../../enums/elementHandlers';
import { edition } from '../../classes/edition';
import { lineup } from '../../classes/lineup';
import { lineupDetails } from "./lineupDetails";

export class editionDetails extends edition {
	constructor(editionId) {
		super(editionId);

		this.headlinersDetails = new lineup(editionId);
		this.lineupDetails = new lineupDetails(editionId);
	};

	get currentEditionYear() {
		return document.getElementById(EDITION.EDITION_DETAILS_ID).dataset.year;
	}

	decorateEditionDates() {
		const editionDate = this.editionDate;

		if (Object.keys(editionDate).length === 1) {
			return editionDate.firstDay;
		} else {
			return `${editionDate.firstDay} - ${editionDate.lastDay}`;
		}
	}

	decorateEditionHeadliners() {
		let fragment = document.createDocumentFragment();

		this.headlinersDetails.headliners.map((item) => {
			const li = document.createElement('li');

			li.textContent = item;
			li.classList.add(EDITION.HEADLINER_CLASS);
			fragment.appendChild(li);
		});

		return fragment;
	}

	renderEditionContainer() {
		let section = document.createElement('section');

		section.id = EDITION.EDITION_DETAILS_ID;
		section.classList.add(`${EDITION.EDITION_DETAILS_YEAR_CLASS}${this.editionYear}`, DIALOGBOX.INACTIVE_HELPER_CLASS);
		section.dataset.year = this.editionYear;

		return section;
	}

	renderEditionDetails() {
		let fragment = document.createDocumentFragment();
		let editionYear = document.createElement('h2');
		let name = document.createElement('h3');
		let dates = document.createElement('p');
		let place = document.createElement('p');

		editionYear.classList.add(EDITION.YEAR_CLASS);
		dates.classList.add(EDITION.DATES_CLASS);
		name.classList.add(EDITION.FULL_NAME_CLASS);
		place.classList.add(EDITION.PLACE_CLASS);

		editionYear.textContent = this.editionYear;
		dates.textContent = this.decorateEditionDates();
		name.textContent = this.editionFullName;
		place.textContent = this.editionPlace;

		fragment.appendChild(editionYear);
		fragment.appendChild(name);
		fragment.appendChild(dates);
		fragment.appendChild(place);

		return fragment;
	};

	renderShortLineupContainer() {
		let div = document.createElement('div');

		div.classList.add(EDITION.LINEUP_CLASS, `${EDITION.LINEUP_EDITION_CLASS}${this.editionYear}`);

		return div;
	}

	updateHeadliners(oldYear) {
		const shortLineupContainer = document.querySelector(`.${EDITION.LINEUP_CLASS}`);
		shortLineupContainer.classList.remove(`${EDITION.LINEUP_EDITION_CLASS}${oldYear}`);
		shortLineupContainer.classList.add(`${EDITION.LINEUP_EDITION_CLASS}${this.editionYear}`);
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).textContent =''; // to clear rain details list

		return this.decorateEditionHeadliners();
	}

	renderHeadliners() {
		let ul = document.createElement('ul');

		ul.classList.add(EDITION.HEADLINERS_CLASS);
		ul.appendChild(this.decorateEditionHeadliners());

		return ul;
	}

	updateEditionDetails() {
		const detailsContainer = document.getElementById(EDITION.EDITION_DETAILS_ID);
		const oldYear = this.currentEditionYear;
		const newYear = this.editionYear;

		detailsContainer.classList.remove(`${EDITION.EDITION_DETAILS_YEAR_CLASS}${oldYear}`);
		detailsContainer.classList.add(`${EDITION.EDITION_DETAILS_YEAR_CLASS}${newYear}`);
		detailsContainer.dataset.year = newYear;

		document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = newYear;
		document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = this.decorateEditionDates();
		document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = this.editionFullName;
		document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = this.editionPlace;
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).appendChild(this.updateHeadliners(oldYear));
	}

	render() {
		let editionContainer = this.renderEditionContainer();
		const editionDetails = this.renderEditionDetails();
		const lineupContainer = this.renderShortLineupContainer();
		const headliners = this.renderHeadliners();
		const lineupLink = this.lineupDetails.renderLineupLink();

		lineupContainer.appendChild(headliners);
		lineupContainer.appendChild(lineupLink);
		editionContainer.appendChild(editionDetails);
		editionContainer.appendChild(lineupContainer);

		return editionContainer;
	}
}
