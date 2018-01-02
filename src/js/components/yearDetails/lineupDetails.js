'use strict';

import { lineup } from "../../classes/lineup";
import { LINEUP, DIALOGBOX, LINK, EDITION } from "../../enums/elementHandlers";
import { LINEUP_LEVELS, ARTIST_KEYS } from '../../enums/lineup';
import * as dialogbox from '../../utils/addDialogbox';
import { setIcon } from "../../utils/setIcon";
import { icons } from "../../utils/iconsLibrary";

const DIALOGBOX_HEADLINE_TEXT = 'Lineup';

export class lineupDetails extends lineup {
	constructor(editionId) {
		super(editionId);
	}

	toggleLineup(e) {
		e.preventDefault();
		dialogbox.toggleDialogboxAction(`#${LINEUP.SECTION_ID}`);
	}

	renderLineupLink() {
		let p = document.createElement('p');
		let a = document.createElement('a');

		p.classList.add(EDITION.LINEUP_LINK_CLASS);
		a.classList.add(LINK.BASIC_CLASS, LINK.INVERTED_STYLE_CLASS, LINK.SIZE_XS_CLASS, LINK.HAS_ICON_CLASS);
		a.href = `#lineup`;
		a.textContent = 'see full lineup';
		a.appendChild(setIcon(icons.plus(), `${LINK.ICON_CLASS}`));
		a.addEventListener('click', this.toggleLineup, null);

		p.appendChild(a);

		return p;
	}

	decorateLineupByType() {
		if(this.mergeArtists) {
			return this.decorateLineupByLevels();
		} else {
			return this.decorateLineupByDays();
		}
	}

	decorateLineupByLevels() {
		let fragment = document.createDocumentFragment();
		const lineup = this.lineup;

		console.log('lineup by levels');
		Object.keys(lineup).map((key) => {
			let ul = document.createElement('ul');

			if (key === LINEUP_LEVELS.DAILY_HEADLINERS || key === LINEUP_LEVELS.DAILY_LVL1) {
				lineup[key].map((item) => {
					item.map((itemItem) => {
						let li = document.createElement('li');

						if (itemItem[ARTIST_KEYS.ARTIST] && !itemItem[ARTIST_KEYS.DISPLAY_NAME]) {
							li.textContent = itemItem[ARTIST_KEYS.ARTIST];
						} else if (itemItem[ARTIST_KEYS.DISPLAY_NAME]) {
							li.textContent = itemItem[ARTIST_KEYS.DISPLAY_NAME];
						} else {
							li.textContent = itemItem;
						}
						ul.appendChild(li);
					});
				});
			} else {
				lineup[key].map((item) => {
					let li = document.createElement('li');

					if (item[ARTIST_KEYS.ARTIST] && !item[ARTIST_KEYS.DISPLAY_NAME]) {
						li.textContent = item[ARTIST_KEYS.ARTIST];
					} else if (item[ARTIST_KEYS.DISPLAY_NAME]) {
						li.textContent = item[ARTIST_KEYS.DISPLAY_NAME];
					} else {
						li.textContent = item;
					}
					ul.appendChild(li);
				});
			}
			fragment.appendChild(ul);
		});

		return fragment;
	}

	decorateLineupByDays() {
		let fragment = document.createDocumentFragment();

		console.log('lineup by days');
		this.lineup;

		return fragment;
	}

	updateLineupDetails() {
		let lineupContainer = document.querySelector(`#${LINEUP.SECTION_ID}`);
		let artistsContainer = document.querySelector(`.${LINEUP.ARTISTS}`);
		let oldYear = lineupContainer.dataset.year;

		lineupContainer.querySelector(`.${DIALOGBOX.HEADLINE_CLASS}`).textContent = `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`;
		lineupContainer.classList.remove(`${LINEUP.EDITION_CLASS}${oldYear}`);
		lineupContainer.classList.add(`${LINEUP.EDITION_CLASS}${this.editionYear}`);
		lineupContainer.dataset.year = this.editionYear;
		artistsContainer.textContent = '';
		artistsContainer.classList.remove(`${LINEUP.ARTISTS_EDITION}${oldYear}`);
		artistsContainer.classList.add(`${LINEUP.ARTISTS_EDITION}${this.editionYear}`);
		artistsContainer.appendChild(this.decorateLineupByType());
	}

	render() {
		let section = document.createElement('section');
		const dialogboxLineup = dialogbox.addDialogbox({
			id: LINEUP.SECTION_ID,
			classNames: [DIALOGBOX.VISIBLE_CLASS, `${LINEUP.EDITION_CLASS}${this.editionYear}`],
			dataAttr: [['year', `${this.editionYear}`]],
			title: `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`,
			content: section,
			closeTitle: 'hide lineup details'
		});

		section.classList.add(LINEUP.ARTISTS, `${LINEUP.ARTISTS_EDITION}${this.editionYear}`);
		section.appendChild(this.decorateLineupByType());

		return dialogboxLineup;
	}
}