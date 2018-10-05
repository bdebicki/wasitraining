import AbstractLineup from './AbstractLineup';
import { ARTIST_KEYS } from '../enums/artist';

/**
 * sort types:
 *	- false - don't sort artists
 *	- 'alphabeticalExceptHeadliners' - sort alphabetical artists from all groups except headliners
 *	- 'customOrder' - sort by 'order' props from artist object
 *	- 'customOrderExceptHeadliners' - sort by 'order' props from artist object but don't touch headliners
 */

export default class Headliners extends AbstractLineup {
	get headliners() {
		if (this.sortType === 'customOrder') {
			return this.sortOrderedHeadliners();
		}
		// sortType is false, 'customOrderExceptHeadliners' or 'alphabeticalExceptHeadliners'
		return this.notSortedHeadliners();
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

	sortOrderedHeadliners() {
		let headliners = [];

		headliners = this.getFlatHeadlinersList()
			.sort((a, b) => a.order - b.order) // sort headliners by order property
			.map((artist) => artist[ARTIST_KEYS.ARTIST]); // flattening array - remove objects and displays only artists

		return headliners;
	}
}
