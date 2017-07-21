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

	get editionDates() {
		const firstDay = this.editionDates()[0].day;
		const lastDay =  this.editionDates()[this.editionLength - 1].day;
		return {firstDay, lastDay};
	}

	get editionDays() {
		return this._dates;
	}
}