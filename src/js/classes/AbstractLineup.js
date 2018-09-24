export default class AbstractLineup {
	constructor(editionId) {
		this._editionDetails = editionId.details;
		this._settings = editionId.lineupSettings;
	}

	get settings() {
		return this._settings;
	}

	get separatorElement() {
		return this.settings.separatorElement;
	}

	get sortType() {
		return this.settings.sortType;
	}

	get rawLineup() {
		return this._editionDetails.map((item) => item.lineup);
	}
}
