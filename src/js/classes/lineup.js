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
 *  - string - display label with information about others artists
 * 	- false - don't display information about others artists
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
		let sortedLineup = {
			headliners: [],
			lvl1: [],
			lvl2: [],
			lvl3: [],
			lvl4: [],
			others: []
		};

		this.rawLineup.map((item) => { // merge artists from different days into levels
			for (var key in item) {
				switch (key.toString()) {
					case "headliners":
						item.headliners.map((subItems) => {
							if (subItems.visible !== false) { // skip not visible artists
								sortedLineup.headliners.push(subItems);
							}
						});
						break;
					case "lvl1":
						item.lvl1.map((subItems) => {
							if (subItems.visible !== false) {
								sortedLineup.lvl1.push(subItems);
							}
						});
						break;
					case "lvl2":
						item.lvl2.map((subItems) => {
							if (subItems.visible !== false) {
								sortedLineup.lvl2.push(subItems);
							}
						});
						break;
					case "lvl3":
						item.lvl3.map((subItems) => {
							if (subItems.visible !== false) {
								sortedLineup.lvl3.push(subItems);
							}
						});
						break;
					case "lvl4":
						item.lvl4.map((subItems) => {
							if (subItems.visible !== false) {
								sortedLineup.lvl4.push(subItems);
							}
						});
						break;
					case "others":
						item.others.map((subItems) => {
							if (subItems.visible !== false) {
								sortedLineup.others.push(subItems);
							}
						});
						break;
				}
			}
		});

		// sort lineup by order property
		sortedLineup.headliners.sort((a, b) => {
			return a.order - b.order;
		});
		sortedLineup.lvl1.sort((a, b) => {
			return a.order - b.order;
		});
		sortedLineup.lvl2.sort((a, b) => {
			return a.order - b.order;
		});
		sortedLineup.lvl3.sort((a, b) => {
			return a.order - b.order;
		});
		sortedLineup.lvl4.sort((a, b) => {
			return a.order - b.order;
		});
		sortedLineup.others.sort((a, b) => {
			return a.order - b.order;
		});

		// remove order indicators
		sortedLineup.headliners.map((item) => {
			delete item.order;
		});
		sortedLineup.lvl1.map((item) => {
			delete item.order;
		});
		sortedLineup.lvl2.map((item) => {
			delete item.order;
		});
		sortedLineup.lvl3.map((item) => {
			delete item.order;
		});
		sortedLineup.lvl4.map((item) => {
			delete item.order;
		});
		sortedLineup.others.map((item) => {
			delete item.order;
		});

		// remove empty levels and build sortedLineup
		if (sortedLineup.headliners.length === 0) {
			delete sortedLineup.headliners;
		}
		if (sortedLineup.lvl1.length === 0) {
			delete sortedLineup.lvl1;
		}
		if (sortedLineup.lvl2.length === 0) {
			delete sortedLineup.lvl2;
		}
		if (sortedLineup.lvl3.length === 0) {
			delete sortedLineup.lvl3;
		}
		if (sortedLineup.lvl4.length === 0) {
			delete sortedLineup.lvl4;
		}
		if (sortedLineup.others.length === 0) {
			delete sortedLineup.others;
		}

		console.log(sortedLineup);
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