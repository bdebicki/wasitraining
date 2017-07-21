'use strict';

export class edition {
	constructor(data) {
		this.id = data.id;
		this.edition = data.edition;
		this.place = data.place;
		this.dates = data.dates;
	}

	get editionId() {
		return this.id;
	}

	get editionName() {
		return this.edition;
	}

	get editionPlace() {
		return this.place;
	}

	get editionLength() {
		return this.dates.length;
	}

	get editionDates() {
		const firstDay = this.editionDates()[0].day;
		const lastDay =  this.editionDates()[this.editionLength - 1].day;
		return {firstDay, lastDay};
	}

	get editionDays() {
		return this.dates;
	}
}