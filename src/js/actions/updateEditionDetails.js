'use strict';

import { EDITION, RAIN } from '../enums/elementHandlers';
import { edition } from '../classes/edition';

function decorateRainDetails(details) {
	let fragment = document.createDocumentFragment();

	document.getElementById(RAIN.EDITION_RAIN_DETAILS_ID).textContent =''; // to clear rain details list

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

	document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = newEdition.editionYear;
	document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = decorateEditionDates(newEdition.editionDate);
	document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = newEdition.editionFullName;
	document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = newEdition.editionPlace;
	document.querySelector(`.${RAIN.RAIN_CLASS}`).textContent = newEdition.editionRain;
	document.getElementById(RAIN.RAIN_DETAILS_ID).appendChild(decorateRainDetails(newEdition.editionDetails));
}