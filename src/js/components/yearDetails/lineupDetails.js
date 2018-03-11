'use strict';

import { lineup } from "../../classes/lineup";
import { LINEUP, DIALOGBOX, LINK, EDITION } from "../../enums/elementHandlers";
import { LINEUP_LEVELS, ARTIST_KEYS, ARTIST_DECORATORS, ARTIST_SLICES_STYLES, ARTIST_SLICES_PROPS } from '../../enums/lineup';
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
	[LINEUP_LEVELS.DAILY_ARTISTS]: LINEUP.ARTISTS_DAILY_CLASS,
};
const dailyLvlToClassMap = {
	[LINEUP_LEVELS.HEADLINERS]: LINEUP.ARTISTS_DAILY_HEADLINER_CLASS,
	[LINEUP_LEVELS.LVL1]: LINEUP.ARTISTS_DAILY_LVL1_CLASS,
};
const artistDecoratorToClassMap = {
	[ARTIST_DECORATORS.PROMOTED]: LINEUP.ARTIST_PROMOTED_CLASS,
	[ARTIST_DECORATORS.EXPANDED]: LINEUP.ARTIST_EXPANDED_CLASS,
	[ARTIST_DECORATORS.COLLAPSED]: LINEUP.ARTIST_COLLAPSED_CLASS,
	[ARTIST_DECORATORS.UPPERCASE]: LINEUP.ARTIST_UPPERCASE_CLASS,
	[ARTIST_DECORATORS.CAPITALIZE]: LINEUP.ARTIST_CAPITALIZE_CLASS,
};
const artistSliceDecoratorToClassMap = {
	[ARTIST_SLICES_STYLES.UP]: LINEUP.ARTIST_SLICE_UP_CLASS,
	[ARTIST_SLICES_STYLES.DOWN]: LINEUP.ARTIST_SLICE_DOWN_CLASS,
	[ARTIST_SLICES_STYLES.MIDDLE]: LINEUP.ARTIST_SLICE_MIDDLE_CLASS,
	[ARTIST_SLICES_STYLES.LOWER]: LINEUP.ARTIST_SLICE_LOWER_CLASS,
	[ARTIST_SLICES_STYLES.MULTILINE]: LINEUP.ARTIST_SLICE_MULTILINE_CLASS,
	[ARTIST_SLICES_STYLES.NEW_LINE]: LINEUP.ARTIST_SLICE_NEW_LINE_CLASS,
	[ARTIST_SLICES_STYLES.EXPANDED]: LINEUP.ARTIST_SLICE_EXPANDED_CLASS,
	[ARTIST_SLICES_STYLES.COLLAPSED]: LINEUP.ARTIST_SLICE_COLLAPSED_CLASS,
	[ARTIST_SLICES_STYLES.INDENTED]: LINEUP.ARTIST_SLICE_INDENTED_CLASS,
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

	artistSliceDecorator(artistName, artistDecorations) {
		const decorations  = artistDecorations;
		const multipleDecorations = Array.isArray(decorations);
		let name = artistName;
		let decoratedName = document.createElement('template'); // document fragment can't be used with innerHtml method
		let replacePattern;

		if(!multipleDecorations) {
			replacePattern = decorations[ARTIST_SLICES_PROPS.SLICE];
		} else {
			replacePattern = new RegExp(
				decorations.map((item) => {
					return item[ARTIST_SLICES_PROPS.SLICE];
				}).join("|"),"gi"
			);
		}

		decoratedName.innerHTML = name.replace(replacePattern, function(matched) {
			let sliceStyleClassName = '';
			const setStyleClassName = (styleList) => {
				if (Array.isArray(styleList[ARTIST_SLICES_PROPS.STYLE])) {
					styleList[ARTIST_SLICES_PROPS.STYLE].map((style) => {
						sliceStyleClassName += ' ' + artistSliceDecoratorToClassMap[style];
					});
				} else {
					sliceStyleClassName = artistSliceDecoratorToClassMap[styleList[ARTIST_SLICES_PROPS.STYLE]];
				}
			};

			if(!multipleDecorations) {
				setStyleClassName(decorations);
			} else {
				decorations.map((item) => {
					if (item[ARTIST_SLICES_PROPS.SLICE] === matched) {
						setStyleClassName(item);
					}
				});
			}
			return `<span class="${LINEUP.ARTIST_SLICE_CLASS} ${sliceStyleClassName}">${matched}</span>`;
		});

		return decoratedName.content;
	}

	decorateArtist(artistKey, target, artistLvl) {
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
		if (artistKey[ARTIST_KEYS.SEPARATOR_MIDDLE]) {
			li.classList.add(LINEUP.ARTIST_SEPARATOR_MIDDLE_CLASS);
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

		if (artistLvl) {
			li.classList.add(dailyLvlToClassMap[artistLvl]);
		}

		target.appendChild(li);
	}

	getLineupByType() {
		switch(this.mergeArtists) {
			case true:
				return this.decorateLineupByLevels();
			case 'exceptHeadliners':
				return this.decorateLineupHeadlinersByDays();
			default:
				return this.decorateLineupByDays();
		}
	}

	decorateLineupByLevels() {
		let fragment = document.createDocumentFragment();
		const lineup = this.lineup;

		Object.keys(lineup).map((key) => {
			let ul = document.createElement('ul');

			ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[key]);

			lineup[key].map((item) => {
				this.decorateArtist(item, ul);
			});

			fragment.appendChild(ul);
		});

		return fragment;
	}

	decorateLineupHeadlinersByDays() {
		let fragment = document.createDocumentFragment();
		const lineup = this.lineup;

		Object.keys(lineup).map((key) => {
			if(key === LINEUP_LEVELS.DAILY_ARTISTS) {
				lineup[key].map((item) => {
					let ul = document.createElement('ul');

					ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[key]);

					Object.keys(item).map((key) => {
						item[key].map((itemKey) => {
							this.decorateArtist(itemKey, ul, key);
						});
					});

					fragment.appendChild(ul);
				});
			} else {
				let ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[key]);

				lineup[key].map((item) => {
					this.decorateArtist(item, ul);
				});

				fragment.appendChild(ul);
			}
		});

		return fragment;
	}

	decorateLineupByDays() {
		let fragment = document.createDocumentFragment();
		const lineup = this.lineup;

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
		const lineupContainer = document.querySelector(`#${LINEUP.SECTION_ID}`);
		const artistsContainer = document.querySelector(`.${LINEUP.ARTISTS_CLASS}`);
		const oldYear = lineupContainer.dataset.year;
		const newYear = this.editionYear;

		lineupContainer.querySelector(`.${DIALOGBOX.HEADLINE_CLASS}`).textContent = `${DIALOGBOX_HEADLINE_TEXT} ${newYear}`;
		lineupContainer.classList.remove(`${LINEUP.EDITION_CLASS}${oldYear}`);
		lineupContainer.classList.add(`${LINEUP.EDITION_CLASS}${newYear}`);
		lineupContainer.dataset.year = newYear;
		artistsContainer.textContent = '';
		artistsContainer.classList.remove(`${LINEUP.ARTISTS_EDITION_CLASS}${oldYear}`);
		artistsContainer.classList.add(`${LINEUP.ARTISTS_EDITION_CLASS}${newYear}`);
		artistsContainer.appendChild(this.getLineupByType());
	}

	render() {
		let section = document.createElement('section');
		const newYear = this.editionYear;

		const dialogboxLineup = dialogbox.addDialogbox({
			id: LINEUP.SECTION_ID,
			classNames: [`${LINEUP.EDITION_CLASS}${newYear}`, 'dialogbox--isVisible'],
			dataAttr: [['year', `${newYear}`]],
			title: `${DIALOGBOX_HEADLINE_TEXT} ${newYear}`,
			content: section,
			closeTitle: 'hide lineup details'
		});

		section.classList.add(LINEUP.ARTISTS_CLASS, `${LINEUP.ARTISTS_EDITION_CLASS}${newYear}`);
		section.appendChild(this.getLineupByType());

		return dialogboxLineup;
	}
}
