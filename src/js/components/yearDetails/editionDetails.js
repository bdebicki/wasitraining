'use strict';

import { EDITION, LINK } from '../../enums/elementHandlers';
import { edition } from '../../classes/edition';
import { lineup } from '../../classes/lineup';
import { lineupDetails } from "./lineupDetails";

export class editionDetails extends edition {
	constructor(editionId) {
		super(editionId);

		this.headlinersDetails = new lineup(editionId);
		this.lineupDetails = new lineupDetails(editionId);
	};

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

		div.classList.add(EDITION.LINEUP_CLASS);

		return div;
	}

	updateHeadliners() {
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
		document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = this.editionYear;
		document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = this.decorateEditionDates();
		document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = this.editionFullName;
		document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = this.editionPlace;
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).appendChild(this.updateHeadliners());
		this.lineupDetails.update();
	}

	render() {
		let editionContainer = this.renderEditionContainer();
		const editionDetails = this.renderEditionDetails();
		const lineupContainer = this.renderShortLineupContainer();
		const headliners = this.renderHeadliners();
		const lineupLink = this.lineupDetails.renderLineupLink();
		const lineup = this.lineupDetails.render();

		lineupContainer.appendChild(headliners);
		lineupContainer.appendChild(lineupLink);
		editionContainer.appendChild(editionDetails);
		editionContainer.appendChild(lineupContainer);
		editionContainer.appendChild(lineup);

		return editionContainer;
	}
}