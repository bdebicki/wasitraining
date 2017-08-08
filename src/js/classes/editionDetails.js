'use strict';

import { DETAILS } from '../enums/classes';
import { edition } from './edition';
import { decorateEditionDates } from '../actions/updateEditionDetails';

export class editionDetails extends edition {
	constructor(editionId) {
		super(editionId);
	};

	displayDetails(e) {
		e.preventDefault();

		console.log('display details')
	}

	renderDetailsLink() {
		const a = document.createElement('a');

		a.classList.add(DETAILS.DETAILS_LINK_CLASS);
		a.href = `#details${this.editionYear}`;
		a.textContent = 'display edition details';
		a.addEventListener('click', this.displayDetails, null);

		return a;
	}

	render(target) {
		const fragment = document.createDocumentFragment();
		const name = document.createElement('h2');
		const dates = document.createElement('p');
		const rain = document.createElement('p');

		name.classList.add(DETAILS.FULL_NAME_CLASS);
		dates.classList.add(DETAILS.DATES_CLASS);
		rain.classList.add(DETAILS.RAIN_CLASS);

		name.textContent = this.editionYear;
		dates.textContent = decorateEditionDates(this.editionDate);
		rain.textContent = this.editionRain;

		fragment.appendChild(name);
		fragment.appendChild(dates);
		fragment.appendChild(rain);
		fragment.appendChild(this.renderDetailsLink());

		target.appendChild(fragment);
	};
}