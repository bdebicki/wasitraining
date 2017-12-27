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

const LINEUP_LEVELS = {
	HEADLINERS: 'headliners',
	LVL1: 'lvl1',
	LVL2: 'lvl2',
	LVL3: 'lvl3',
	LVL4: 'lvl4',
	OTHERS: 'others',
};

const ARTIST_KEYS = {
	FORCE_ORDER: 'forceOrder',
	SORT_BY: 'sortBy',
};

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

	noMergeArtists(target) { // filter artists and build list on only visible artists
		this.rawLineup.map((item) => {
			Object.keys(item).map((key) => { // iterate on lineup levels
				item[key] = item[key].filter((e) => { // remove hidden elements from levels
					if(e.visible !== false) {
						return e;
					}
				})
			});

			target.push(item); // push filtered day lineup to final structure
		});
	}

	clearArtistObject(artist, key) {
		delete artist[key]; // remove used key from

		if(Object.keys(artist).length === 1) { // leave string if 'artist' key is only one
			artist = artist.artist;
		}

		return artist;
	}

	sortAlphabeticallyLevel(sortData) {
		sortData.sort((a, b) => {
			const val = (input) => {
				if(typeof input === 'object' && input[ARTIST_KEYS.SORT_BY]) {
					return input[ARTIST_KEYS.SORT_BY];

				}
				if(typeof input === 'object' && !input[ARTIST_KEYS.SORT_BY]) {
					return input.artist;
				}
				return input;
			};
			const valA = val(a);
			const valB = val(b);

			if(valA < valB) {
				return -1;
			}
			if(valA > valB) {
				return 1;
			}
			return 0;
		});

		sortData.map((item, index) => { // clear 'sortBy' key on artist obcject
			if(item[ARTIST_KEYS.SORT_BY]) {
				sortData.splice(index, 1, this.clearArtistObject(item, ARTIST_KEYS.SORT_BY));
			}
		});

		return sortData;
	}

	forceOrder(input) { // force positions on lineup
		const level = input;

		level.map((keyItem, index) => {
			const artist = keyItem;

			if(artist[ARTIST_KEYS.FORCE_ORDER]) {
				const newIndex = artist[ARTIST_KEYS.FORCE_ORDER] - 1; // -1 because array order is from 0

				level.splice(index, 1); // remove artist from current position
				level.splice(newIndex, 0, this.clearArtistObject(artist, ARTIST_KEYS.FORCE_ORDER)); // move artist to forced order
			}
		})
	}

	mergeAndSortCustomArtists() { // merge artists and sort artists by customOrder
		let sortedLineup = {
			[LINEUP_LEVELS.HEADLINERS]: [],
			[LINEUP_LEVELS.LVL1]: [],
			[LINEUP_LEVELS.LVL2]: [],
			[LINEUP_LEVELS.LVL3]: [],
			[LINEUP_LEVELS.LVL4]: [],
			[LINEUP_LEVELS.OTHERS]: []
		};

		const pushToLvl = (item, key) => {
			item[key].map((subItems) => {
				if (subItems.visible !== false) { // skip not visible artists
					sortedLineup[key].push(subItems);
				}
			});
		};

		// merge artists from different days into levels
		this.rawLineup.map((item) => { // iterate on days
			Object.keys(item).map((key) => { // iterate on day artists from different levels
				switch (key) { // get specific level from raw lineup
					case LINEUP_LEVELS.HEADLINERS:
						// iterate on specific level artists from raw lineup and add push artist to level in sortedLineup
						pushToLvl(item, LINEUP_LEVELS.HEADLINERS);
						break;
					case LINEUP_LEVELS.LVL1:
						pushToLvl(item, LINEUP_LEVELS.LVL1);
						break;
					case LINEUP_LEVELS.LVL2:
						pushToLvl(item, LINEUP_LEVELS.LVL2);
						break;
					case LINEUP_LEVELS.LVL3:
						pushToLvl(item, LINEUP_LEVELS.LVL3);
						break;
					case LINEUP_LEVELS.LVL4:
						pushToLvl(item, LINEUP_LEVELS.LVL4);
						break;
					case LINEUP_LEVELS.OTHERS:
						pushToLvl(item, LINEUP_LEVELS.OTHERS);
						break;
				}
			});
		});

		Object.keys(sortedLineup).map((key) => {
			if(sortedLineup[key].length !== 0) { // if level has some artist proceed
				sortedLineup[key].sort((a, b) => { // sort lineup by order property
					return a.order - b.order;
				});
				sortedLineup[key].map((item) => { // remove order indicators
					delete item.order;
				});
			} else { // remove empty levels
				delete sortedLineup[key];
			}
		});

		console.log('merge artists and sort artists by customOrder');
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
		let sortedLineup = [];

		this.noMergeArtists(sortedLineup);

		console.log('don\'t merge artists and don\'t sort artists');
		console.log(sortedLineup);
		return sortedLineup;
	}

	notMergedAndSortAlpabeticallyExceptHeadliners() {
		let sortedLineup = [];

		this.noMergeArtists(sortedLineup);

		sortedLineup.map((item) => { // sort artist of levels except
			Object.keys(item).map((key) => {
				const currentLvl = item[key];

				if(key !== LINEUP_LEVELS.HEADLINERS) { // sort only not headliner artists
					this.sortAlphabeticallyLevel(currentLvl);
					this.forceOrder(currentLvl); // force alphabetical order
				}
			});
		});


		console.log('don\'t merge artists and sort artists by alphabeticalExceptHeadliners');
		console.log(sortedLineup);
		return sortedLineup;
	}
}