'use strict';

export class edition {
	constructor(editionData) {
		this._id = editionData.id;
		this._year = editionData.editionYear;
		this._place = editionData.place;
		this._name = editionData.fullName;
		this._headliners = editionData.headliners;
		this._details = editionData.details;
	}

	get editionId() {
		return this._id;
	}

	get editionYear() {
		return this._year;
	}

	get editionFullName() {
		return this._name;
	}

	get editionPlace() {
		return `${this._place.object}, ${this._place.city}`;
	}

	get editionDetails() {
		return this._details;
	}

	get editionLength() {
		return this.editionDetails.length;
	}

	get headliners() {
		return this._headliners;
	}

	get editionDate() {
		const firstDay = this.editionDetails[0].day;

		if(this.editionLength > 1) {
			const lastDay =  this.editionDetails[this.editionLength - 1].day;
			return {firstDay, lastDay};
		} else {
			return {firstDay};
		}
	}

	get editionRain() {
		for(let day of this.editionDetails) {
			if(day.rain === true) {
				return 'yes';
			}
		}

		return 'no';
	}
}