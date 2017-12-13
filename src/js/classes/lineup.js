'use strict';

/**
 * sort types:
 *	- false - don't sort artists
 *	- 'alphabetical' - sort alphabetical
 *	- 'alphabeticalExceptHeadliners' - sort alphabetical artists from all groups except headliners
 *	- 'customOrder' - sort by 'order' props from artist object
 *	- 'customOrderExceptHeadliners' - sort by 'order' props from artist object but don't touch headliners
 *
 * mergeArtists:
 * 	- false - don't merge artists levels and split lineup on days
 * 	- true - merge artists by levels
 * 	- 'exceptHeadliners' - merge artists from all levels except headliners and display them splited by days
 *
 * otherArtists:
 *  - string - display label with information about other artists
 * 	- false - don't display information about other artists
 */

export class lineup {
	constructor(editionId) {
		this._editionDetails = editionId.details;
		this._settings = editionId.lineupSettings;
	}

	get settings() {
		return this._settings;
	}

	get sortType() {
		return this.settings.sortType;
	}

	get mergeArtists() {
		return this.settings.mergeArtists;
	}

	get otherArtists() {
		return this.settings.otherArtists;
	}

	get rawLineup() {
		let lineup = [];

		this._editionDetails.map((item) => {
			lineup.push(item.lineup);
		});

		return lineup;
	}

	get headliners() {
		if(this.sortType === 'alphabetical') {
			return this.sortAlphabeticallyHeadliners();
		} else if (this.sortType === 'customOrder') {
			return this.sortOrderedHeadliners();
		} else { // sortType is false, 'customOrderExceptHeadliners' or 'alphabeticalExceptHeadliners'
			return this.notSortedHeadliners();
		}
	}

	get lineup() {
		if (this.mergeArtists === true) { // merge artists
			if(this.sortType === 'customOrder') { // & sort by custom order
				this.mergeAndSortCustomArtists();
			} else if (this.sortType === 'alphabeticalExceptHeadliners') {
				this.mergeAndSortAlphabeticallyExceptHearliners();
			}
		} else if (this.mergeArtists === 'exceptHeadliners' && this.sortType === 'customOrderExceptHeadliners') {
			this.mergeExceptHeadlinersAndSortCustomExceptHeadliners();
		} else {
			if(this.sortType === false) {
				this.notMergedAndNotSorted();
			} else if (this.sortType === 'alphabeticalExceptHeadliners') {
				this.notMergedAndSortAlpabeticallyExceptHeadliners();
			}
		}
	}

	notSortedHeadliners() {
		let headliners = [];

		this.rawLineup.map((item) => { // merge headliners from all days into one flat array (with artists only)
			if (item.headliners) { // check does headliners was on that day
				item.headliners.map((subItems) => {
					if (typeof subItems === 'object') {
						headliners.push(subItems.artist);
					} else {
						headliners.push(subItems);
					}
				});
			}
		});

		return headliners;
	}

	sortAlphabeticallyHeadliners() {
		return this.notSortedHeadliners.sort(); // sort alphabetically flat array
	}

	sortOrderedHeadliners() {
		let headliners = [];

		this.rawLineup.map((item) => { // merge headliners from all days in one array
			if (item.headliners) { // check does headliners was on that day
				item.headliners.map((subItems) => {
					headliners.push(subItems);
				});
			}
		});

		headliners.sort((a, b) => { // sort headliners by order property
			return a.order - b.order;
		});

		headliners.map((item, index) => { // flattening array - remove objects and displays only artists
			headliners.splice(index, 1, item.artist)
		});

		return headliners;
	}

	mergeAndSortCustomArtists() {
		console.log('merge artists and sort artists by customOrder');
	}

	mergeAndSortAlphabeticallyExceptHearliners() {
		console.log('merge artists and sort artists by alphabeticalExceptHeadliners')
	}

	mergeExceptHeadlinersAndSortCustomExceptHeadliners() {
		console.log('merge artists except headliners and sort artists by customOrderExceptHeadliners');
	}

	notMergedAndNotSorted() {
		console.log('don\'t merge artists and don\'t sort artists');
	}

	notMergedAndSortAlpabeticallyExceptHeadliners() {
		console.log('don\'t merge artists and sort artists by alphabeticalExceptHeadliners');
	}
}