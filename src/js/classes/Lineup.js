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
 * 	- 'exceptHeadliners' - merge artists from all levels except headliners and display them split by days
 * 	- 'customLevels' - create custom levels with mixed artists
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
				preparedLineup = this.mergeAndSortAlphabeticallyExceptHeadliners();
			}
		} else if (this.mergeArtistsType === 'exceptHeadliners' && this.sortType === 'customOrderExceptHeadliners') {
			preparedLineup = this.mergeExceptHeadlinersAndSortCustomExceptHeadliners();
		} else if (this.sortType === false) {
			preparedLineup = this.notMergedAndNotSorted();
		} else if (this.sortType === 'alphabeticalExceptHeadliners') {
			preparedLineup = this.notMergedAndSortAlphabeticallyExceptHeadliners();
		}

		return preparedLineup;
	}

	getFlatHeadlinersList() {
		let flatHeadliners = [];

		flatHeadliners = this.rawLineup
			.reduce((acc, day) => { // push headliners from days
				if (day.headliners) { // check does headliners was on that day
					acc.push(day.headliners);
				}

				return acc;
			}, [])
			.reduce((acc, artist) => acc.concat(artist), []); // flat array with headliners (remove nester arrays)

		return flatHeadliners;
	}

	notSortedHeadliners() { // merge headliners from all days into one flat array (with artists only)
		let headliners = [];

		headliners = this.getFlatHeadlinersList()
			.map((headlinersArtist) => { // change object artists to sting
				if (typeof headlinersArtist === 'object') {
					return headlinersArtist[ARTIST_KEYS.ARTIST];
				}

				return headlinersArtist;
			});

		return headliners;
	}

	sortAlphabeticallyHeadliners() {
		return this.notSortedHeadliners.sort(); // sort alphabetically flat array
	}

	sortOrderedHeadliners() {
		let headliners = [];

		headliners = this.getFlatHeadlinersList()
			.sort((a, b) => a.order - b.order) // sort headliners by order property
			.map((artist) => artist[ARTIST_KEYS.ARTIST]); // flattening array - remove objects and displays only artists

		return headliners;
	}


	noMergeArtists(lvls = false) {
		const artists = this.rawLineup.map((day) => { // iterate on days
			const currentDay = day;

			Object.keys(currentDay).forEach((lvl) => { // iterate on day levels
				if (lvls === false || lvls.indexOf(lvl) !== -1) { // check does merge specific lvls or all
					currentDay[lvl] = currentDay[lvl].filter((artist) => { // remove hidden elements from levels
						if (artist[ARTIST_KEYS.VISIBLE] !== false) {
							return artist;
						}

						return null;
					});
				} else {
					delete currentDay[lvl]; // if lvl is not on a list remove it
				}
			});

			return currentDay;
		});

		return artists;
	}

	mergeArtists(lvls = false) {
		const artists = { // prepared object structure to keep specific order of objects
			[LINEUP_LEVELS.HEADLINERS]: [],
			[LINEUP_LEVELS.LVL1]: [],
			[LINEUP_LEVELS.LVL2]: [],
			[LINEUP_LEVELS.LVL3]: [],
			[LINEUP_LEVELS.LVL4]: [],
			[LINEUP_LEVELS.OTHERS]: [],
		};

		this.rawLineup.forEach((day) => {
			Object.keys(day).forEach((lvl) => {
				if (lvls === false || lvls.indexOf(lvl) !== -1) { // check does merge specific lvls or all
					day[lvl].forEach((artist) => {
						if (artists[lvl] === undefined) {
							artists[lvl] = [];
						}
						if (artist[ARTIST_KEYS.VISIBLE] !== false) {
							artists[lvl].push(artist);
						}
					});
				}
			});
		});

		Object.keys(artists).forEach((lvl) => { // clean empty levels
			if (artists[lvl].length === 0) {
				delete artists[lvl];
			}
		});

		return artists;
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
		const sortArray = sortScope;
		const newArray = [];

		sortArray.map((artist) => { // move artists without 'forceOrder' to new array
			if ((typeof artist === 'object' && !artist[ARTIST_KEYS.FORCE_ORDER]) || typeof artist === 'string') {
				newArray.push(artist);
			}
		});

		newArray.sort((a, b) => { // sort artists without 'forceOrder'
			const val = (input) => {
				if (typeof input === 'object' && input[ARTIST_KEYS.SORT_BY]) {
					return input[ARTIST_KEYS.SORT_BY];
				} else if (typeof input === 'object' && !input[ARTIST_KEYS.SORT_BY]) {
					return input[ARTIST_KEYS.ARTIST];
				}

				return input;
			};
			const valA = val(a).toLowerCase();
			const valB = val(b).toLowerCase();

			return valA.localeCompare(valB, 'pl', { sensitivity: 'accent' });
		});

		sortArray.map((artist) => { // push artists with 'forceOrder' to new array (to right position)
			if (artist[ARTIST_KEYS.FORCE_ORDER]) {
				const newIndex = artist[ARTIST_KEYS.FORCE_ORDER] - 1;

				newArray.splice(newIndex, 0, artist);
			}
		});

		newArray.map((artist, index) => { // clear 'sortBy' & 'forceOrder' keys on artist object
			Lineup.updateArtistObjectOnArray({
				scope: newArray,
				index,
				artist,
				key: ARTIST_KEYS.SORT_BY,
				withValidation: true,
			});
			Lineup.updateArtistObjectOnArray({
				scope: newArray,
				index,
				artist,
				key: ARTIST_KEYS.FORCE_ORDER,
				withValidation: true,
			});
		});

		return newArray;
	}

	static sortCustomOrderLevel(sortScope) {
		const scope = sortScope;
		let sortedLvl = [];

		sortedLvl = scope
			.sort((a, b) => a.order - b.order) // sort lineup lvl by order property
			.map((artist, index) => // remove order indicators
				Lineup.updateArtistObjectOnArray({
					scope,
					index,
					artist,
					key: ARTIST_KEYS.ORDER,
				}));

		return sortedLvl;
	}

	mergeAndSortCustomArtists() { // merge artists and sort artists by customOrder
		const sortedLineup = this.mergeArtists();

		Object.keys(sortedLineup).forEach((lvl) => {
			const currentLvl = sortedLineup[lvl];

			Lineup.clearEmptyLevels(sortedLineup, lvl); // remove empty levels
			Lineup.sortCustomOrderLevel(currentLvl);
		});

		console.log('merge artists and sort artists by customOrder', sortedLineup);
		return sortedLineup;
	}

	mergeAndSortAlphabeticallyExceptHeadliners() {
		const sortedLineup = this.mergeArtists();

		Object.keys(sortedLineup).forEach((lvl) => {
			const currentLvl = sortedLineup[lvl];

			Lineup.clearEmptyLevels(sortedLineup, lvl); // remove empty levels

			if (lvl !== LINEUP_LEVELS.HEADLINERS) {
				const sortedLvl = Lineup.sortAlphabeticallyLevel(currentLvl);
				currentLvl.splice(0, currentLvl.length, ...sortedLvl);
			}
		});

		console.log('merge artists and sort artists by alphabeticalExceptHeadliners', sortedLineup);
		return sortedLineup;
	}

	mergeExceptHeadlinersAndSortCustomExceptHeadliners() {
		console.log('mergeExceptHeadlinersAndSortCustomExceptHeadliners');
		const sortedLineup = {};
		const artistsByLvl = this.mergeArtists(
			[LINEUP_LEVELS.LVL2, LINEUP_LEVELS.LVL3, LINEUP_LEVELS.LVL4, LINEUP_LEVELS.OTHERS]
		);

		// sort merged artists
		Object.keys(artistsByLvl).forEach((lvl) => Lineup.sortCustomOrderLevel(artistsByLvl[lvl]));

		// push daily artists to sorted lineup
		sortedLineup[LINEUP_LEVELS.DAILY_ARTISTS] = this.noMergeArtists([LINEUP_LEVELS.HEADLINERS, LINEUP_LEVELS.LVL1]);

		Object.assign(sortedLineup, artistsByLvl); // push lvl artists to sorted lineup

		console.log('merge artists except headliners and sort artists by customOrderExceptHeadliners', sortedLineup);
		return sortedLineup;
	}

	notMergedAndNotSorted() {
		const sortedLineup = this.noMergeArtists();

		console.log('don\'t merge artists and don\'t sort artists', sortedLineup);
		return sortedLineup;
	}

	notMergedAndSortAlphabeticallyExceptHeadliners() {
		const sortedLineup = this.noMergeArtists();

		sortedLineup.forEach((day) => { // sort artist of levels except headliners
			Object.keys(day).map((lvl) => {
				const currentLvl = day[lvl];

				if (lvl !== LINEUP_LEVELS.HEADLINERS) { // sort only not headliner artists
					const sortedLvl = Lineup.sortAlphabeticallyLevel(currentLvl);
					currentLvl.splice(0, currentLvl.length, ...sortedLvl);
				}

				return currentLvl;
			});
		});


		console.log('don\'t merge artists and sort artists by alphabeticalExceptHeadliners', sortedLineup);
		return sortedLineup;
	}
}
