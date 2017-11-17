'use strict';

import { EDITION } from '../../enums/elementHandlers';
import { edition } from '../../classes/edition';

export class editionDetails extends edition {
	constructor(editionId) {
		super(editionId);
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

		this.headliners.map((item) => {
			const li = document.createElement('li');

			li.textContent = item;
			li.classList.add(EDITION.HEADLINER_CLASS);
			fragment.appendChild(li);
		});

		return fragment;
	}

	toggleLineup(e) {
		e.preventDefault();

		console.log('display lineup');
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

	renderLineupLink() {
		let a = document.createElement('a');

		a.classList.add(EDITION.LINEUP_LINK_CLASS);
		a.href = `#lineup`;
		a.textContent = 'see full lineup';
		a.addEventListener('click', this.toggleLineup, null);

		return a;
	}

	updateEditionDetails() {
		document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = this.editionYear;
		document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = this.decorateEditionDates();
		document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = this.editionFullName;
		document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = this.editionPlace;
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).appendChild(this.updateHeadliners());
	}

	render() {
		let editionContainer = this.renderEditionContainer();
		const editionDetails = this.renderEditionDetails();
		const headliners = this.renderHeadliners();
		const lineupLink = this.renderLineupLink();

		editionContainer.appendChild(editionDetails);
		editionContainer.appendChild(headliners);
		editionContainer.appendChild(lineupLink);

		return editionContainer;
	}
}