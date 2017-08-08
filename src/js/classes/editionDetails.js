'use strict';

import { DETAILS, VISIBILITY_CLASS } from '../enums/classes';
import { edition } from './edition';
import { decorateEditionDates } from '../actions/updateEditionDetails';

export class editionDetails extends edition {
	constructor(editionId) {
		super(editionId);
	};

	toggleDetails(e) {
		e.preventDefault();

		const details = document.querySelector(`.${DETAILS.DETAILS_CLASS}`);

		if(details.classList.contains(VISIBILITY_CLASS)) {
			details.classList.remove(VISIBILITY_CLASS);
		} else {
			details.classList.add(VISIBILITY_CLASS);
		}
	}

	renderDetailsContainer() {
		const fragment = document.createDocumentFragment();
		const ul = document.createElement('ul');

		ul.classList.add(DETAILS.DETAILS_CLASS);

		this.editionDetails.map((item) => {
			const li = document.createElement('li');

			const rain = item.rain ? 'rain' : 'no rain';
			li.textContent = `${item.day}: ${rain}`;

			fragment.appendChild(li);
		});

		ul.appendChild(fragment);

		return ul;
	}

	renderDetailsLink() {
		const a = document.createElement('a');

		a.classList.add(DETAILS.DETAILS_LINK_CLASS);
		a.href = `#details${this.editionYear}`;
		a.textContent = 'display edition details';
		a.addEventListener('click', this.toggleDetails, null);

		return a;
	}

	render(target) {
		const fragment = document.createDocumentFragment();
		const editionYear = document.createElement('h2');
		const dates = document.createElement('p');
		const name = document.createElement('p');
		const place = document.createElement('p');
		const rain = document.createElement('p');

		editionYear.classList.add(DETAILS.YEAR_CLASS);
		dates.classList.add(DETAILS.DATES_CLASS);
		name.classList.add(DETAILS.FULL_NAME_CLASS);
		place.classList.add(DETAILS.PLACE_CLASS);
		rain.classList.add(DETAILS.RAIN_CLASS);

		editionYear.textContent = this.editionYear;
		dates.textContent = decorateEditionDates(this.editionDate);
		name.textContent = this.editionFullName;
		place.textContent = this.editionPlace;
		rain.textContent = this.editionRain;

		fragment.appendChild(editionYear);
		fragment.appendChild(dates);
		fragment.appendChild(name);
		fragment.appendChild(place);
		fragment.appendChild(rain);
		fragment.appendChild(this.renderDetailsLink());
		fragment.appendChild(this.renderDetailsContainer());

		target.appendChild(fragment);
	};
}