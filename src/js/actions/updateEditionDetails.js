'use strict';

import { DETAILS } from '../enums/classes';
import { edition } from '../classes/edition';

function decorateDetails(details) {
	const fragment = document.createDocumentFragment();

	document.querySelector(`.${DETAILS.DETAILS_CLASS}`).textContent ='';

	details.map((item) => {
		const li = document.createElement('li');
		const rain = item.rain ? 'rain' : 'no rain';
		li.textContent = `${item.day}: ${rain}`;

		fragment.appendChild(li);
	});

	return fragment;
}

export function decorateEditionDates(dates) {
	if (Object.keys(dates).length === 1) {
		return dates.firstDay;
	} else {
		return `${dates.firstDay} - ${dates.lastDay}`;
	}
}

export function updateDetails(data) {
	const newEdition = new edition(data);

	document.querySelector(`.${DETAILS.YEAR_CLASS}`).textContent = newEdition.editionYear;
	document.querySelector(`.${DETAILS.DATES_CLASS}`).textContent = decorateEditionDates(newEdition.editionDate);
	document.querySelector(`.${DETAILS.FULL_NAME_CLASS}`).textContent = newEdition.editionFullName;
	document.querySelector(`.${DETAILS.PLACE_CLASS}`).textContent = newEdition.editionPlace;
	document.querySelector(`.${DETAILS.RAIN_CLASS}`).textContent = newEdition.editionRain;
	document.querySelector(`.${DETAILS.DETAILS_CLASS}`).appendChild(decorateDetails(newEdition.editionDetails));
}