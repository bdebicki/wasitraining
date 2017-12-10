'use strict';

export class lineup {
	constructor(editionId) {
		this._edition = editionId;
		this._editionDetails = editionId.details;
		this._settings = editionId.lineupSettings;
	}

	get settings() {
		return this._settings;
	}
	
	get lineup() {
		let lineup = [];

		this._editionDetails.map((item) => {
			lineup.push(item.lineup);
		});

		return lineup;
	}

	get headliners() {
		let headliners = [];

		this.lineup.map((item) => {
			if (item.headliners.length > 1) {
				item.headliners.map((subItems) => {
					headliners.push(subItems);
				});
			} else {
				headliners.push(item.headliners.toString());
			}
		});

		return headliners;
	}
}