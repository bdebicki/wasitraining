'use strict';

export function decorateEditionDates(dates) {
	if (Object.keys(dates).length === 1) {
		return dates.firstDay;
	} else {
		return `${dates.firstDay} - ${dates.lastDay}`;
	}
}

export function updateDetails(year, dates, rain) {
	document.querySelector(`.${DETAILS.FULL_NAME_CLASS}`).textContent = year;
	document.querySelector(`.${DETAILS.DATES_CLASS}`).textContent = decorateEditionDates(dates);
	document.querySelector(`.${DETAILS.RAIN_CLASS}`).textContent = rain;
}