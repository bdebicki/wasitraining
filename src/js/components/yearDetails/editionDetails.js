'use strict';

import { EDITION } from '../../enums/elementHandlers';
import { edition } from '../../classes/edition';
import { decorateEditionDates } from '../../actions/updateEditionDetails';

export class editionDetails extends edition {
	constructor(editionId) {
		super(editionId);
	};

	renderEditionContainer() {
		const section = document.createElement('section');

		section.id = EDITION.EDITION_DETAILS_ID;

		return section;
	}

	renderEditionDetails() {
		let fragment = document.createDocumentFragment();
		const editionYear = document.createElement('h2');
		const dates = document.createElement('p');
		const name = document.createElement('h3');
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
		fragment.appendChild(dates);
		fragment.appendChild(name);
		fragment.appendChild(place);

		return fragment;
	};

	render() {
		let editionContainer = this.renderEditionContainer();
		const editionDetails = this.renderEditionDetails();

		editionContainer.appendChild(editionDetails);

		return editionContainer;
	}
}