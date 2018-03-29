import { LINEUP_LEVELS, ARTIST_KEYS } from '../enums/lineup';

/**
 * sort types:
 *	- false - don't sort artists
 *	- 'alphabetical' - sort alphabetical
 *	- 'alphabeticalExceptHeadliners' - sort alphabetical artists from all groups except headliners
 *	- 'customOrder' - sort by 'order' props from artist object
 *	- 'customOrderExceptHeadliners' - sort by 'order' props from artist object but don't touch headliners
 *
 * mergeArtistsType:
 * 	- false - don't merge artists levels and split lineup on days
 * 	- true - merge artists by levels
 * 	- 'exceptHeadliners' - merge artists from all levels except headliners and display them splited by days
 *
 * otherArtists:
 *  - string - display label with information about others artists
 * 	- false - don't display information about others artists
 */

export default class Lineup {
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

	get mergeArtistsType() {
		return this.settings.mergeArtists;
	}

	get otherArtists() {
		return this.settings.otherArtists;
	}

	get rawLineup() {
		const lineup = [];

		this._editionDetails.map((item) => lineup.push(item.lineup));

		return lineup;
	}

	get headliners() {
		if (this.sortType === 'alphabetical') {
			return this.sortAlphabeticallyHeadliners();
		} else if (this.sortType === 'customOrder') {
			return this.sortOrderedHeadliners();
		}
		// sortType is false, 'customOrderExceptHeadliners' or 'alphabeticalExceptHeadliners'
		return this.notSortedHeadliners();
	}

	get lineup() {
		let preparedLineup;

		if (this.mergeArtistsType === true) { // merge artists
			if (this.sortType === 'customOrder') { // & sort by custom order
				preparedLineup = this.mergeAndSortCustomArtists();
			} else if (this.sortType === 'alphabeticalExceptHeadliners') {
				preparedLineup = this.mergeAndSortAlphabeticallyExceptHearliners();
			}
		} else if (this.mergeArtistsType === 'exceptHeadliners' && this.sortType === 'customOrderExceptHeadliners') {
			preparedLineup = this.mergeExceptHeadlinersAndSortCustomExceptHeadliners();
		} else if (this.sortType === false) {
			preparedLineup = this.notMergedAndNotSorted();
		} else if (this.sortType === 'alphabeticalExceptHeadliners') {
			preparedLineup = this.notMergedAndSortAlpabeticallyExceptHeadliners();
		}

		return preparedLineup;
	}

	notSortedHeadliners() {
		const headliners = [];

		// merge headliners from all days into one flat array (with artists only)
		this.rawLineup.forEach((day) => {
			if (day.headliners) { // check does headliners was on that day
				day.headliners.forEach((headlinersArtist) => {
					if (typeof headlinersArtist === 'object') {
						headliners.push(headlinersArtist[ARTIST_KEYS.ARTIST]);
					} else {
						headliners.push(headlinersArtist);
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

		this.rawLineup.forEach((day) => { // merge headliners from all days in one array
			if (day.headliners) { // check does headliners was on that day
				headliners = day.headliners.map((headlinersArtist) => headlinersArtist);
			}
		});

		headliners.sort((a, b) => a.order - b.order); // sort headliners by order property

		headliners.forEach((item, index) => { // flattening array - remove objects and displays only artists
			headliners.splice(index, 1, item[ARTIST_KEYS.ARTIST]);
		});

		return headliners;
	}

	noMergeArtists({
		source = this.rawLineup,
		scope,
		skipHeadliners = false,
		skipLvl1 = false,
		skipLvl2 = false,
		skipLvl3 = false,
		skipLvl4 = false,
		skipOthers = false,
	}) { // filter artists and build list on only visible artists
		source.map((day) => {
			const currentDay = day;
			Object.keys(day).map((lvl) => { // iterate on lineup levels
				if (lvl === LINEUP_LEVELS.HEADLINERS && skipHeadliners) {
					delete currentDay[LINEUP_LEVELS.HEADLINERS];
				} else if (lvl === LINEUP_LEVELS.LVL1 && skipLvl1) {
					delete currentDay[LINEUP_LEVELS.LVL1];
				} else if (lvl === LINEUP_LEVELS.LVL2 && skipLvl2) {
					delete currentDay[LINEUP_LEVELS.LVL2];
				} else if (lvl === LINEUP_LEVELS.LVL3 && skipLvl3) {
					delete currentDay[LINEUP_LEVELS.LVL3];
				} else if (lvl === LINEUP_LEVELS.LVL4 && skipLvl4) {
					delete currentDay[LINEUP_LEVELS.LVL4];
				} else if (lvl === LINEUP_LEVELS.OTHERS && skipOthers) {
					delete currentDay[LINEUP_LEVELS.OTHERS];
				} else { // leave level artists
					currentDay[lvl] = day[lvl].filter((e) => { // remove hidden elements from levels
						if (e[ARTIST_KEYS.VISIBLE] !== false) {
							return e;
						}
					});
				}
			});

			scope.push(day); // push filtered day lineup to final structure
		});
	}

	mergeArtists({
		source = this.rawLineup,
		scope,
		mergeHeadliners = true,
		mergeLvl1 = true,
		mergeLvl2 = true,
		mergeLvl3 = true,
		mergeLvl4 = true,
		mergeOthers = true,
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
				if (key === LINEUP_LEVELS.HEADLINERS && mergeHeadliners) {
					pushToLvl(item, LINEUP_LEVELS.HEADLINERS);
				}
				if (key === LINEUP_LEVELS.LVL1 && mergeLvl1) {
					pushToLvl(item, LINEUP_LEVELS.LVL1);
				}
				if (key === LINEUP_LEVELS.LVL2 && mergeLvl2) {
					pushToLvl(item, LINEUP_LEVELS.LVL2);
				}
				if (key === LINEUP_LEVELS.LVL3 && mergeLvl3) {
					pushToLvl(item, LINEUP_LEVELS.LVL3);
				}
				if (key === LINEUP_LEVELS.LVL4 && mergeLvl4) {
					pushToLvl(item, LINEUP_LEVELS.LVL4);
				}
				if (key === LINEUP_LEVELS.OTHERS && mergeOthers) {
					pushToLvl(item, LINEUP_LEVELS.OTHERS);
				}
			});
		});
	}

	static clearArtistObject(artist, key) {
		let currentArtist = artist;

		delete currentArtist[key]; // remove used key from

		if (Object.keys(currentArtist).length === 1) { // leave string if 'artist' key is only one
			currentArtist = currentArtist[ARTIST_KEYS.ARTIST];
		}

		return currentArtist;
	}

	static clearEmptyLevels(scope, key) {
		const currentScope = scope;

		if (currentScope[key].length === 0) { // if level has not artist remove empty levels
			delete currentScope[key];
		}
	}

	static updateArtistObjectOnArray({
		scope,
		index,
		place = 1,
		artist,
		key,
		withValidation = false,
	}) {
		const update = (updateScope, updateIndex, updatePlace, updateArtist, updateKey) => {
			updateScope.splice(updateIndex, updatePlace, Lineup.clearArtistObject(updateArtist, updateKey));
		};

		if (withValidation) {
			if (artist[key]) {
				update(scope, index, place, artist, key);
			}
		} else {
			update(scope, index, place, artist, key);
		}
	}

	static sortAlphabeticallyLevel(sortScope) {
		sortScope.sort((a, b) => {
			const val = (input) => {
				if (typeof input === 'object' && input[ARTIST_KEYS.SORT_BY]) {
					return input[ARTIST_KEYS.SORT_BY];
				} else if (typeof input === 'object' && !input[ARTIST_KEYS.SORT_BY]) {
					return input[ARTIST_KEYS.ARTIST];
				}

				return input;
			};
			const valA = val(a);
			const valB = val(b);

			if (valA < valB) {
				return -1;
			}
			if (valA > valB) {
				return 1;
			}
			return 0;
		});

		sortScope.map((item, index) =>
			// clear 'sortBy' key on artist obcject
			Lineup.updateArtistObjectOnArray({
				scope: sortScope,
				index,
				artist: item,
				key: ARTIST_KEYS.SORT_BY,
				withValidation: true,
			}));

		return sortScope;
	}

	static sortCustomOrderLevel(sortScope) {
		sortScope.sort((a, b) => a.order - b.order); // sort lineup by order property

		sortScope.map((item, index) =>
			// remove order indicators
			Lineup.updateArtistObjectOnArray({
				scope: sortScope,
				index,
				artist: item,
				key: ARTIST_KEYS.ORDER,
			}));

		return sortScope;
	}

	static forceOrder(input) { // force positions on lineup
		const level = input;

		level.map((keyItem, index) => {
			const artist = keyItem;

			if (artist[ARTIST_KEYS.FORCE_ORDER]) {
				const newIndex = artist[ARTIST_KEYS.FORCE_ORDER] - 1; // -1 because array order is from 0

				level.splice(index, 1); // remove artist from current position
				Lineup.updateArtistObjectOnArray({ // move artist to forced order
					scope: level,
					index: newIndex,
					place: 0,
					artist,
					key: ARTIST_KEYS.FORCE_ORDER,
				});
			}
		});
	}

	mergeAndSortCustomArtists() { // merge artists and sort artists by customOrder
		const sortedLineup = {
			[LINEUP_LEVELS.HEADLINERS]: [],
			[LINEUP_LEVELS.LVL1]: [],
			[LINEUP_LEVELS.LVL2]: [],
			[LINEUP_LEVELS.LVL3]: [],
			[LINEUP_LEVELS.LVL4]: [],
			[LINEUP_LEVELS.OTHERS]: [],
		};

		this.mergeArtists({ scope: sortedLineup });

		Object.keys(sortedLineup).map((key) => {
			const currentLvl = sortedLineup[key];

			Lineup.clearEmptyLevels(sortedLineup, key); // remove empty levels
			Lineup.sortCustomOrderLevel(currentLvl);
		});

		console.log('merge artists and sort artists by customOrder');
		console.log(sortedLineup);
		return sortedLineup;
	}

	mergeAndSortAlphabeticallyExceptHearliners() {
		const sortedLineup = {
			[LINEUP_LEVELS.HEADLINERS]: [],
			[LINEUP_LEVELS.LVL1]: [],
			[LINEUP_LEVELS.LVL2]: [],
			[LINEUP_LEVELS.LVL3]: [],
			[LINEUP_LEVELS.LVL4]: [],
			[LINEUP_LEVELS.OTHERS]: [],
		};

		this.mergeArtists({ scope: sortedLineup });

		Object.keys(sortedLineup).map((key) => {
			const currentLvl = sortedLineup[key];

			Lineup.clearEmptyLevels(sortedLineup, key); // remove empty levels

			if (key !== LINEUP_LEVELS.HEADLINERS) {
				Lineup.sortAlphabeticallyLevel(currentLvl);
				Lineup.forceOrder(currentLvl); // force alphabetical order
			}
		});

		console.log('merge artists and sort artists by alphabeticalExceptHeadliners');
		console.log(sortedLineup);
		return sortedLineup;
	}

	mergeExceptHeadlinersAndSortCustomExceptHeadliners() {
		const sortedLineup = {
			[LINEUP_LEVELS.DAILY_ARTISTS]: [], // instead of headliners & lvl1
			[LINEUP_LEVELS.LVL2]: [],
			[LINEUP_LEVELS.LVL3]: [],
			[LINEUP_LEVELS.LVL4]: [],
			[LINEUP_LEVELS.OTHERS]: [],
		};

		// merge other artists
		this.mergeArtists({ scope: sortedLineup, mergeHeadliners: false, mergeLvl1: false });

		// merge headliners & lvl1 into days
		this.noMergeArtists({ scope: sortedLineup[LINEUP_LEVELS.DAILY_ARTISTS], skipLvl2: true, skipOthers: true });

		Object.keys(sortedLineup).map((key) => {
			const currentLvl = sortedLineup[key];

			Lineup.clearEmptyLevels(sortedLineup, key); // remove empty levels

			if (key !== LINEUP_LEVELS.DAILY_ARTISTS) {
				Lineup.sortCustomOrderLevel(currentLvl); // sort artists except daily artists
			}
		});

		console.log('merge artists except headliners and sort artists by customOrderExceptHeadliners');
		console.log(sortedLineup);
		return sortedLineup;
	}

	notMergedAndNotSorted() {
		const sortedLineup = [];

		this.noMergeArtists({ scope: sortedLineup });

		console.log('don\'t merge artists and don\'t sort artists');
		console.log(sortedLineup);
		return sortedLineup;
	}

	notMergedAndSortAlpabeticallyExceptHeadliners() {
		const sortedLineup = [];

		this.noMergeArtists({ scope: sortedLineup });

		sortedLineup.map((item) => { // sort artist of levels except
			Object.keys(item).map((key) => {
				const currentLvl = item[key];

				if (key !== LINEUP_LEVELS.HEADLINERS) { // sort only not headliner artists
					Lineup.sortAlphabeticallyLevel(currentLvl);
					Lineup.forceOrder(currentLvl); // force alphabetical order
				}
			});
		});


		console.log('don\'t merge artists and sort artists by alphabeticalExceptHeadliners');
		console.log(sortedLineup);
		return sortedLineup;
	}
}
