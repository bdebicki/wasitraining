'use strict';

export class edition {
	constructor(editionData) {
		this._id = editionData.id;
		this._year = editionData.edition;
		this._place = editionData.place;
		this._dates = editionData.dates;
	}

	get editionId() {
		return this._id;
	}

	get editionYear() {
		return this._year;
	}

	get editionPlace() {
		return this._place;
	}

	get editionLength() {
		return this._dates.length;
	}

	get editionDays() {
		return this._dates;
	}

	get editionDate() {
		const firstDay = this.editionDays[0].day;

		if(this.editionLength > 1) {
			const lastDay =  this.editionDays[this.editionLength - 1].day;
			return {firstDay, lastDay};
		} else {
			return {firstDay};
		}
	}

	get editionRain() {
		for(let day of this.editionDays) {
			if(day['rain'] === true) {
				return 'rain';
			}
		}

		return 'no rain';
	}

	get editionDaysRain() {
		return 'days rain';
	}
}