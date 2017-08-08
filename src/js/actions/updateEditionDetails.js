'use strict';

import { DETAILS } from '../enums/classes';
import { edition } from '../classes/edition';

export function decorateEditionDates(dates) {
	if (Object.keys(dates).length === 1) {
		return dates.firstDay;
	} else {
		return `${dates.firstDay} - ${dates.lastDay}`;
	}
}

export function updateDetails(data) {
	const newEdition = new edition(data);

	document.querySelector(`.${DETAILS.FULL_NAME_CLASS}`).textContent = newEdition.editionYear;
	document.querySelector(`.${DETAILS.DATES_CLASS}`).textContent = decorateEditionDates(newEdition.editionDate);
	document.querySelector(`.${DETAILS.RAIN_CLASS}`).textContent = newEdition.editionRain;
}