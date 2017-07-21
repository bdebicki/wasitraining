'use strict';

export class edition {
	constructor(data) {
		this._id = data.id;
		this._edition = data.edition;
		this._place = data.place;
		this._dates = data.dates;
	}

	get editionId() {
		return this._id;
	}

	get editionName() {
		return this._edition;
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

	get editionDates() {
		const firstDay = this.editionDays[0].day;
		const lastDay =  this.editionDays[this.editionLength - 1].day;
		return {firstDay, lastDay};
	}
}