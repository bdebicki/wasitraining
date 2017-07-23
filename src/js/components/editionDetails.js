'use strict';

import { edition } from './edition';
import { DETAILS } from '../enums/classes';

export class editionDetails extends edition {
	constructor(data) {
		super(data);
	};

	updateDated(start, end) {
		return `${start} - ${end}`;
	};

	updateDetails(data) {
		document.querySelector(`.${DETAILS.FULL_NAME_CLASS}`).textContent = this.editionYear;
		document.querySelector(`.${DETAILS.DATES_CLASS}`).textContent = this.updateDated(this.editionDate.firstDay, this.editionDate.lastDay);
		document.querySelector(`.${DETAILS.RAIN_CLASS}`).textContent = this.editionRain;
	};

	render(target) {
		const fragment = document.createDocumentFragment();
		const name = document.createElement('h2');
		const dates = document.createElement('p');
		const rain = document.createElement('p');

		name.classList.add(DETAILS.FULL_NAME_CLASS);
		dates.classList.add(DETAILS.DATES_CLASS);
		rain.classList.add(DETAILS.RAIN_CLASS);

		name.textContent = this.editionYear;
		dates.textContent = this.updateDated(this.editionDate.firstDay, this.editionDate.lastDay);
		rain.textContent = this.editionRain;

		fragment.appendChild(name);
		fragment.appendChild(dates);
		fragment.appendChild(rain);

		target.appendChild(fragment);
	};
}