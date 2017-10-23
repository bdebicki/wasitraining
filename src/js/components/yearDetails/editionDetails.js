'use strict';

import { EDITION } from '../../enums/elementHandlers';
import { edition } from '../../classes/edition';
import { decorateEditionDates } from '../../actions/updateEditionDetails';

export class editionDetails extends edition {
	constructor(editionId) {
		super(editionId);
	};

	toggleLineup(e) {
		e.preventDefault();

		console.log('display lineup');
	}

	renderEditionContainer() {
		const section = document.createElement('section');

		section.id = EDITION.EDITION_DETAILS_ID;

		return section;
	}

	renderEditionDetails() {
		let fragment = document.createDocumentFragment();
		const editionYear = document.createElement('h2');
		const name = document.createElement('h3');
		const dates = document.createElement('p');
		const place = document.createElement('p');

		editionYear.classList.add(EDITION.YEAR_CLASS);
		dates.classList.add(EDITION.DATES_CLASS);
		name.classList.add(EDITION.FULL_NAME_CLASS);
		place.classList.add(EDITION.PLACE_CLASS);

		editionYear.textContent = this.editionYear;
		dates.textContent = decorateEditionDates(this.editionDate);
		name.textContent = this.editionFullName;
		place.textContent = this.editionPlace;

		fragment.appendChild(editionYear);
		fragment.appendChild(name);
		fragment.appendChild(dates);
		fragment.appendChild(place);

		return fragment;
	};

	renderHeadliners() {
		let fragment = document.createDocumentFragment();
		const ul = document.createElement('ul');

		ul.classList.add(EDITION.HEADLINERS_CLASS);

		this.headliners.map((item) => {
			const li = document.createElement('li');

			li.textContent = item;
			fragment.appendChild(li);
		});

		ul.appendChild(fragment);

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