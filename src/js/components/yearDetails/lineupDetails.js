'use strict';

import { lineup } from "../../classes/lineup";
import { LINEUP, DIALOGBOX, LINK, EDITION } from "../../enums/elementHandlers";
import { LINEUP_LEVELS, ARTIST_KEYS, ARTIST_DECORATORS, ARTIST_SLICES } from '../../enums/lineup';
import * as dialogbox from '../../utils/addDialogbox';
import { setIcon } from "../../utils/setIcon";
import { icons } from "../../utils/iconsLibrary";

const DIALOGBOX_HEADLINE_TEXT = 'Lineup';
const lineupLvlToClassMap = {
	[LINEUP_LEVELS.HEADLINERS]: LINEUP.ARTISTS_HEADLINERS_CLASS,
	[LINEUP_LEVELS.LVL1]: LINEUP.ARTISTS_LVL1_CLASS,
	[LINEUP_LEVELS.LVL2]: LINEUP.ARTISTS_LVL2_CLASS,
	[LINEUP_LEVELS.LVL3]: LINEUP.ARTISTS_LVL3_CLASS,
	[LINEUP_LEVELS.LVL4]: LINEUP.ARTISTS_LVL4_CLASS,
	[LINEUP_LEVELS.OTHERS]: LINEUP.ARTISTS_OTHERS_CLASS,
	[LINEUP_LEVELS.DAILY_HEADLINERS]: LINEUP.ARTISTS_DAILY_HEADLINERS_CLASS,
	[LINEUP_LEVELS.DAILY_LVL1]: LINEUP.ARTISTS_DAILY_LVL1_CLASS,
};
const artistDecoratorToClassMap = {
	[ARTIST_DECORATORS.PROMOTED]: LINEUP.ARTIST_PROMOTED_CLASS,
	[ARTIST_DECORATORS.EXPANDED]: LINEUP.ARTIST_EXPANDED_CLASS,
	[ARTIST_DECORATORS.UPPERCASE]: LINEUP.ARTIST_UPPERCASE_CLASS,
};
const artistSliceDecoratorToClassMap = {
	[ARTIST_SLICES.UP]: LINEUP.ARTIST_SLICE_UP_CLASS,
	[ARTIST_SLICES.DOWN]: LINEUP.ARTIST_SLICE_DOWN_CLASS,
	[ARTIST_SLICES.MIDDLE]: LINEUP.ARTIST_SLICE_MIDDLE_CLASS,
	[ARTIST_SLICES.LOWER]: LINEUP.ARTIST_SLICE_LOWER_CLASS,
	[ARTIST_SLICES.MULTILINE]: LINEUP.ARTIST_SLICE_MULTILINE_CLASS,
	[ARTIST_SLICES.NEW_LINE]: LINEUP.ARTIST_SLICE_NEW_LINE_CLASS,
};

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

	sliceDecorator(name, decorations, decoratedName) {
		let span = document.createElement('span');

		name = name.split(decorations['slice']);
		span.textContent = decorations['slice'];
		span.classList.add(LINEUP.ARTIST_SLICE_CLASS, artistSliceDecoratorToClassMap[decorations['style']]);
		decoratedName.append(name[0], span, name[1]);
	}

	artistSliceDecorator(artistName, artistDecorations) {
		const decorations  = artistDecorations;

		if(!Array.isArray(decorations)) {
			let name = artistName;
			let decoratedName = document.createDocumentFragment();
			let span = document.createElement('span');

			name = name.split(decorations['slice']);
			span.textContent = decorations['slice'];
			span.classList.add(LINEUP.ARTIST_SLICE_CLASS, artistSliceDecoratorToClassMap[decorations['style']]);
			decoratedName.append(name[0], span, name[1]);

			return decoratedName;
		} else {
			let name = artistName;
			// let decoratedName = document.createDocumentFragment();
			let decoratedName = document.createElement('template');
			let tmp;

			tmp = name.replace(/with|Orchestra and Choir/gi, function(matched) {
				let span = document.createElement('span');
				span.textContent = matched;

				return `<span>${matched}</span>`;
			});
			decoratedName.innerHTML = tmp;
			console.log(tmp, decoratedName.content);

			return decoratedName.content;
		}
	}

	decorateArtist(artistKey, target) {
		let li = document.createElement('li');
		let artistName;

		li.classList.add(LINEUP.ARTIST_CLASS);
		if (artistKey[ARTIST_KEYS.DECORATOR]) {
			li.classList.add(artistDecoratorToClassMap[artistKey[ARTIST_KEYS.DECORATOR]]);
		}
		if (artistKey[ARTIST_KEYS.MARKED]) {
			li.classList.add(LINEUP.ARTIST_MARKED_CLASS);
		}
		if (artistKey[ARTIST_KEYS.MULTILINE]) {
			li.classList.add(LINEUP.ARTIST_MULTILINE_CLASS);
		}

		if (artistKey[ARTIST_KEYS.CANCELED]) {
			li.classList.add(LINEUP.ARTIST_CANCELED_CLASS);
		}

		if (artistKey[ARTIST_KEYS.REPLACEMENT]) {
			li.classList.add(LINEUP.ARTIST_REPLACEMENT_CLASS);
		}

		if (artistKey[ARTIST_KEYS.ARTIST] && !artistKey[ARTIST_KEYS.DISPLAY_NAME]) {
			artistName = artistKey[ARTIST_KEYS.ARTIST];
		} else if (artistKey[ARTIST_KEYS.DISPLAY_NAME]) {
			artistName = artistKey[ARTIST_KEYS.DISPLAY_NAME];
		} else {
			artistName = artistKey;
		}

		if (artistKey[ARTIST_KEYS.SLICE_DECORATOR]) {
			li.append(this.artistSliceDecorator(artistName, artistKey[ARTIST_KEYS.SLICE_DECORATOR]));
		} else {
			li.textContent = artistName;
		}

		target.appendChild(li);
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

			ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[key]);

			if (key === LINEUP_LEVELS.DAILY_HEADLINERS || key === LINEUP_LEVELS.DAILY_LVL1) {
				lineup[key].map((item) => {
					item.map((itemItem) => {
						this.decorateArtist(itemItem, ul);
					});
				});
			} else {
				lineup[key].map((item) => {
					this.decorateArtist(item, ul);
				});
			}
			fragment.appendChild(ul);
		});

		return fragment;
	}

	decorateLineupByDays() {
		let fragment = document.createDocumentFragment();
		const lineup = this.lineup;

		console.log('lineup by days');
		lineup.map((item) => {
			let section = document.createElement('section');

			section.classList.add(LINEUP.ARTISTS_DAY_CLASS);

			Object.keys(item).map((key) => {
				let ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[key]);

				item[key].map((itemKey) => {
					this.decorateArtist(itemKey, ul);
				});

				section.appendChild(ul);
			});

			fragment.appendChild(section);
		});

		return fragment;
	}

	updateLineupDetails() {
		let lineupContainer = document.querySelector(`#${LINEUP.SECTION_ID}`);
		let artistsContainer = document.querySelector(`.${LINEUP.ARTISTS_CLASS}`);
		let oldYear = lineupContainer.dataset.year;

		lineupContainer.querySelector(`.${DIALOGBOX.HEADLINE_CLASS}`).textContent = `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`;
		lineupContainer.classList.remove(`${LINEUP.EDITION_CLASS}${oldYear}`);
		lineupContainer.classList.add(`${LINEUP.EDITION_CLASS}${this.editionYear}`);
		lineupContainer.dataset.year = this.editionYear;
		artistsContainer.textContent = '';
		artistsContainer.classList.remove(`${LINEUP.ARTISTS_EDITION_CLASS}${oldYear}`);
		artistsContainer.classList.add(`${LINEUP.ARTISTS_EDITION_CLASS}${this.editionYear}`);
		artistsContainer.appendChild(this.decorateLineupByType());
	}

	render() {
		let section = document.createElement('section');
		const dialogboxLineup = dialogbox.addDialogbox({
			id: LINEUP.SECTION_ID,
			classNames: [DIALOGBOX.VISIBLE_CLASS],
			dataAttr: [['year', `${this.editionYear}`]],
			title: `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`,
			content: section,
			closeTitle: 'hide lineup details'
		});

		section.classList.add(LINEUP.ARTISTS_CLASS, `${LINEUP.ARTISTS_EDITION_CLASS}${this.editionYear}`);
		section.appendChild(this.decorateLineupByType());

		return dialogboxLineup;
	}
}