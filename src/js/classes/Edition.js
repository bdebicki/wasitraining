export default class Edition {
	constructor(editionData) {
		this._id = editionData.id;
		this._year = editionData.editionYear;
		this._place = editionData.place;
		this._name = editionData.fullName;
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

	get editionDate() {
		const firstDay = this.editionDetails[0].day;

		if (this.editionLength > 1) {
			const lastDay = this.editionDetails[this.editionLength - 1].day;

			return { firstDay, lastDay };
		}

		return firstDay;
	}

	get editionRain() {
		return this.editionDetails.some((day) => day.rain === true);
	}
}
