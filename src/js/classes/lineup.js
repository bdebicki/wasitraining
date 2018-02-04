'use strict';

import { LINEUP_LEVELS, ARTIST_KEYS } from '../enums/lineup';

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
		this._editionYear = editionId.editionYear;
		this._editionDetails = editionId.details;
		this._settings = editionId.lineupSettings;
	}

	get editionYear() {
		return this._editionYear;
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
				return this.mergeAndSortCustomArtists();
			} else if (this.sortType === 'alphabeticalExceptHeadliners') {
				return this.mergeAndSortAlphabeticallyExceptHeadliners();
			}
		} else if (this.mergeArtists === 'exceptHeadliners' && this.sortType === 'customOrderExceptHeadliners') {
			return this.mergeExceptHeadlinersAndSortCustomExceptHeadliners();
		} else {
			if(this.sortType === false) {
				return this.notMergedAndNotSorted();
			} else if (this.sortType === 'alphabeticalExceptHeadliners') {
				return this.notMergedAndSortAlphabeticallyExceptHeadliners();
			}
		}
	}

	notSortedHeadliners() {
		let headliners = [];

		this.rawLineup.map((item) => { // merge headliners from all days into one flat array (with artists only)
			if (item.headliners) { // check does headliners was on that day
				item.headliners.map((subItems) => {
					if (typeof subItems === 'object') {
						headliners.push(subItems[ARTIST_KEYS.ARTIST]);
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
			headliners.splice(index, 1, item[ARTIST_KEYS.ARTIST])
		});

		return headliners;
	}

	_noMergeArtists({
		source = this.rawLineup,
		scope,
		skipHeadliners = false,
		skipLvl1 = false,
		skipLvl2 = false,
		skipLvl3 = false,
		skipLvl4 = false,
		skipOthers = false
	}) { // filter artists and build list on only visible artists
		source.map((item) => {
			Object.keys(item).map((key) => { // iterate on lineup levels
				if(key === LINEUP_LEVELS.HEADLINERS && skipHeadliners) {
					delete item[LINEUP_LEVELS.HEADLINERS];
				} else if(key === LINEUP_LEVELS.LVL1 && skipLvl1) {
					delete item[LINEUP_LEVELS.LVL1];
				} else if(key === LINEUP_LEVELS.LVL2 && skipLvl2) {
					delete item[LINEUP_LEVELS.LVL2];
				} else if(key === LINEUP_LEVELS.LVL3 && skipLvl3) {
					delete item[LINEUP_LEVELS.LVL3];
				} else if(key === LINEUP_LEVELS.LVL4 && skipLvl4) {
					delete item[LINEUP_LEVELS.LVL4];
				} else if(key === LINEUP_LEVELS.OTHERS && skipOthers) {
					delete item[LINEUP_LEVELS.OTHERS];
				} else { // leave level artists
					item[key] = item[key].filter((e) => { // remove hidden elements from levels
						if (e[ARTIST_KEYS.VISIBLE] !== false) {
							return e;
						}
					});
				}
			});

			scope.push(item); // push filtered day lineup to final structure
		});
	}

	_mergeArtists({
		source = this.rawLineup,
		scope,
		mergeHeadliners = true,
		mergeLvl1 = true,
		mergeLvl2 = true,
		mergeLvl3 = true,
		mergeLvl4 = true,
		mergeOthers = true
	}) {
		const pushToLvl = (item, key) => {
			item[key].map((subItems) => {
				if (subItems[ARTIST_KEYS.VISIBLE] !== false) { // skip not visible artists
					scope[key].push(subItems);
				}
			});
		};

		// merge artists from different days into levels
		source.map((item) => { // iterate on days
			Object.keys(item).map((key) => { // iterate on day artists from different levels
				// iterate on specific level artists from raw lineup and add push artist to level in sortedLineup
				if(key === LINEUP_LEVELS.HEADLINERS && mergeHeadliners) {
					pushToLvl(item, LINEUP_LEVELS.HEADLINERS);
				}
				if(key === LINEUP_LEVELS.LVL1 && mergeLvl1) {
					pushToLvl(item, LINEUP_LEVELS.LVL1);
				}
				if(key === LINEUP_LEVELS.LVL2 && mergeLvl2) {
					pushToLvl(item, LINEUP_LEVELS.LVL2);
				}
				if(key === LINEUP_LEVELS.LVL3 && mergeLvl3) {
					pushToLvl(item, LINEUP_LEVELS.LVL3);
				}
				if(key === LINEUP_LEVELS.LVL4 && mergeLvl4) {
					pushToLvl(item, LINEUP_LEVELS.LVL4);
				}
				if(key === LINEUP_LEVELS.OTHERS && mergeOthers) {
					pushToLvl(item, LINEUP_LEVELS.OTHERS);
				}
			});
		});
	}

	_clearArtistObject(artist, key) {
		delete artist[key]; // remove used key from

		if(Object.keys(artist).length === 1) { // leave string if 'artist' key is only one
			artist = artist[ARTIST_KEYS.ARTIST];
		}

		return artist;
	}

	_clearEmptyLevels(scope, key) {
		if(scope[key].length === 0) { // if level has not artist remove empty levels
			delete scope[key];
		}
	}

	_updateArtistObjectOnArray({scope, index, place = 1, artist, key, withValidation = false}) {
		const updateScope = (scope, index, place, artist, key) => {
			scope.splice(index, place, this._clearArtistObject(artist, key));
		};

		if (withValidation) { // check does property exist
			if(artist[key]) {
				updateScope(scope, index, place, artist, key);
			}
		} else {
			updateScope(scope, index, place, artist, key);
		}
	}

	_sortAlphabeticallyLevel(sortScope) {
		let sortArray = sortScope;
		let newArray = [];

		sortArray.map((item) => { // move artists without 'forceOrder' to new array
			if (typeof item === 'object' && !item[ARTIST_KEYS.FORCE_ORDER] || typeof item === 'string') {
				newArray.push(item);
			}
		});

		newArray.sort((a, b) => { // sort artists without 'forceOrder'
			const val = (input) => {
				if(typeof input === 'object' && input[ARTIST_KEYS.SORT_BY]) {
					return input[ARTIST_KEYS.SORT_BY];

				} else if(typeof input === 'object' && !input[ARTIST_KEYS.SORT_BY]) {
					return input[ARTIST_KEYS.ARTIST];
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

		sortArray.map((item) => { // push artists with 'forceOrder' to new array (to right position)
			if (item[ARTIST_KEYS.FORCE_ORDER]) {
				const artist = item;
				const newIndex = artist[ARTIST_KEYS.FORCE_ORDER] - 1;

				newArray.splice(newIndex, 0, artist);
			}
		});

		newArray.map((item, index) => { // clear 'sortBy' & 'forceOrder' keys on artist object
			this._updateArtistObjectOnArray({
				scope: newArray,
				index: index,
				artist: item,
				key: ARTIST_KEYS.SORT_BY,
				withValidation: true,
			});
			this._updateArtistObjectOnArray({
				scope: newArray,
				index: index,
				artist: item,
				key: ARTIST_KEYS.FORCE_ORDER,
				withValidation: true,
			});
		});

		return newArray;
	}

	_sortCustomOrderLevel(sortScope) {
		sortScope.sort((a, b) => { // sort lineup by order property
			return a.order - b.order;
		});
		sortScope.map((item, index) => { // remove order indicators
			this._updateArtistObjectOnArray({
				scope: sortScope,
				index: index,
				artist: item,
				key: ARTIST_KEYS.ORDER,
			});
		});

		return sortScope;
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

		this._mergeArtists({scope: sortedLineup});

		Object.keys(sortedLineup).map((key) => {
			const currentLvl = sortedLineup[key];

			this._clearEmptyLevels(sortedLineup, key); // remove empty levels
			this._sortCustomOrderLevel(currentLvl)
		});

		console.log('merge artists and sort artists by customOrder');
		console.log(sortedLineup);
		return sortedLineup;
	}

	mergeAndSortAlphabeticallyExceptHeadliners() {
		let sortedLineup = {
			[LINEUP_LEVELS.HEADLINERS]: [],
			[LINEUP_LEVELS.LVL1]: [],
			[LINEUP_LEVELS.LVL2]: [],
			[LINEUP_LEVELS.LVL3]: [],
			[LINEUP_LEVELS.LVL4]: [],
			[LINEUP_LEVELS.OTHERS]: []
		};

		this._mergeArtists({scope: sortedLineup});

		Object.keys(sortedLineup).map((key) => {
			const currentLvl = sortedLineup[key];

			this._clearEmptyLevels(sortedLineup, key); // remove empty levels

			if(key !== LINEUP_LEVELS.HEADLINERS) {
				this._sortAlphabeticallyLevel(currentLvl);
			}
		});

		console.log('merge artists and sort artists by alphabeticalExceptHeadliners');
		console.log(sortedLineup);
		return sortedLineup;
	}

	mergeExceptHeadlinersAndSortCustomExceptHeadliners() {
		let sortedLineup = {
			[LINEUP_LEVELS.DAILY_ARTISTS]: [], // instead of headliners & lvl1
			[LINEUP_LEVELS.LVL2]: [],
			[LINEUP_LEVELS.LVL3]: [],
			[LINEUP_LEVELS.LVL4]: [],
			[LINEUP_LEVELS.OTHERS]: []
		};

		this._mergeArtists({scope: sortedLineup, mergeHeadliners: false, mergeLvl1: false}); // merge other artists
		this._noMergeArtists({scope: sortedLineup[LINEUP_LEVELS.DAILY_ARTISTS], skipLvl2: true, skipOthers: true}); // merge headliners & lvl1 into days

		Object.keys(sortedLineup).map((key) => {
			const currentLvl = sortedLineup[key];

			this._clearEmptyLevels(sortedLineup, key); // remove empty levels

			if(key !== LINEUP_LEVELS.DAILY_ARTISTS) {
				this._sortCustomOrderLevel(currentLvl); // sort artists except daily artists
			}
		});

		console.log('merge artists except headliners and sort artists by customOrderExceptHeadliners');
		console.log(sortedLineup);
		return sortedLineup;
	}

	notMergedAndNotSorted() {
		let sortedLineup = [];

		this._noMergeArtists({scope: sortedLineup});

		console.log('don\'t merge artists and don\'t sort artists');
		console.log(sortedLineup);
		return sortedLineup;
	}

	notMergedAndSortAlphabeticallyExceptHeadliners() {
		let sortedLineup = [];

		this._noMergeArtists({scope: sortedLineup});

		sortedLineup.map((item) => { // sort artist of levels except
			Object.keys(item).map((key) => {
				const currentLvl = item[key];

				if(key !== LINEUP_LEVELS.HEADLINERS) { // sort only not headliner artists
					this._sortAlphabeticallyLevel(currentLvl);
				}
			});
		});

		console.log('don\'t merge artists and sort artists by alphabeticalExceptHeadliners');
		console.log(sortedLineup);
		return sortedLineup;
	}
}
