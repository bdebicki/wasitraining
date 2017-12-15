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

	mergeAndSortCustomArtists() { // merge artists and sort artists by customOrder
		let headliners = [];
		let lvl1 = [];
		let lvl2 = [];
		let lvl3 = [];
		let lvl4 = [];
		let other = [];
		let sortedLineup = {};

		this.rawLineup.map((item) => { // merge artists from different days into levels
			for (var key in item) {
				switch (key.toString()) {
					case "headliners":
						item.headliners.map((subItems) => {
							if (subItems.visible !== false) { // skip not visible artists
								headliners.push(subItems);
							}
						});
						break;
					case "lvl1":
						item.lvl1.map((subItems) => {
							if (subItems.visible !== false) {
								lvl1.push(subItems);
							}
						});
						break;
					case "lvl2":
						item.lvl2.map((subItems) => {
							if (subItems.visible !== false) {
								lvl2.push(subItems);
							}
						});
						break;
					case "lvl3":
						item.lvl3.map((subItems) => {
							if (subItems.visible !== false) {
								lvl3.push(subItems);
							}
						});
						break;
					case "lvl4":
						item.lvl4.map((subItems) => {
							if (subItems.visible !== false) {
								lvl4.push(subItems);
							}
						});
						break;
					case "other":
						item.other.map((subItems) => {
							if (subItems.visible !== false) {
								other.push(subItems);
							}
						});
						break;
				}
			}
		});

		// sort lineup by order property
		headliners.sort((a, b) => {
			return a.order - b.order;
		});
		lvl1.sort((a, b) => {
			return a.order - b.order;
		});
		lvl2.sort((a, b) => {
			return a.order - b.order;
		});
		lvl3.sort((a, b) => {
			return a.order - b.order;
		});
		lvl4.sort((a, b) => {
			return a.order - b.order;
		});
		other.sort((a, b) => {
			return a.order - b.order;
		});

		// remove order indicators
		headliners.map((item) => {
			delete item.order;
		});
		lvl1.map((item) => {
			delete item.order;
		});
		lvl2.map((item) => {
			delete item.order;
		});
		lvl3.map((item) => {
			delete item.order;
		});
		lvl4.map((item) => {
			delete item.order;
		});
		other.map((item) => {
			delete item.order;
		});

		// remove empty levels and build sortedLineup
		if (headliners.length > 0) {
			sortedLineup.headliners = headliners;
		}
		if (lvl1.length > 0) {
			sortedLineup.lvl1 = lvl1;
		}
		if (lvl2.length > 0) {
			sortedLineup.lvl2 = lvl2;
		}
		if (lvl3.length > 0) {
			sortedLineup.lvl3 = lvl3;
		}
		if (lvl4.length > 0) {
			sortedLineup.lvl4 = lvl4;
		}
		if (other.length > 0) {
			sortedLineup.other = other;
		}

		return sortedLineup;
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