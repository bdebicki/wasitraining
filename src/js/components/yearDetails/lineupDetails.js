'use strict';

import { lineup } from "../../classes/lineup";
import { LINEUP, DIALOGBOX, LINK, EDITION } from "../../enums/elementHandlers";
import {
	LINEUP_LEVELS, ARTIST_KEYS, ARTIST_DECORATORS, ARTIST_SLICES_STYLES, ARTIST_SLICES_PROPS,
	ARTIST_ALIGN
} from '../../enums/lineup';
import { ARTIST_CANCELED } from '../../enums/content';
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
const alignToClassMap = {
	[ARTIST_ALIGN.LEFT]: LINEUP.ARTIST_ALIGN_LEFT_CLASS,
	[ARTIST_ALIGN.RIGHT]: LINEUP.ARTIST_ALIGN_RIGHT_CLASS,
};
const artistDecoratorToClassMap = {
	[ARTIST_DECORATORS.PROMOTED]: LINEUP.ARTIST_PROMOTED_CLASS,
	[ARTIST_DECORATORS.EXPANDED]: LINEUP.ARTIST_EXPANDED_CLASS,
	[ARTIST_DECORATORS.COLLAPSED]: LINEUP.ARTIST_COLLAPSED_CLASS,
	[ARTIST_DECORATORS.UPPERCASE]: LINEUP.ARTIST_UPPERCASE_CLASS,
	[ARTIST_DECORATORS.COMPRESSED]: LINEUP.ARTIST_COMPRESSED_CLASS,
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
	[ARTIST_SLICES_STYLES.COMPRESSED]: LINEUP.ARTIST_SLICE_COMPRESSED_CLASS,
	[ARTIST_SLICES_STYLES.INDENTED]: LINEUP.ARTIST_SLICE_INDENTED_CLASS,
	[ARTIST_SLICES_STYLES.PREVIOUS_LINE]: LINEUP.ARTIST_SLICE_PREVIOUS_LINE_CLASS,
};

export class lineupDetails extends lineup {
	constructor(editionId) {
		super(editionId);
	}

	toggleLineup(e) {
		e.preventDefault();
		dialogbox.toggleDialogboxAction(`#${LINEUP.SECTION_ID}`, `#${EDITION.EDITION_DETAILS_ID}`);
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

	decorateArtist(artistKey, target, index, artistLvl) {
		const fragment = document.createDocumentFragment();
		const li = document.createElement('li');
		const artistId = index + 1;
		let artistName;

		li.dataset.artistId = `${artistLvl}-${artistId}`;

		if (artistKey[ARTIST_KEYS.ARTIST] && !artistKey[ARTIST_KEYS.DISPLAY_NAME]) {
			artistName = artistKey[ARTIST_KEYS.ARTIST];
		} else if (artistKey[ARTIST_KEYS.DISPLAY_NAME]) {
			artistName = artistKey[ARTIST_KEYS.DISPLAY_NAME];
		} else {
			artistName = artistKey;
		}

		li.classList.add(LINEUP.ARTIST_CLASS);

		if(artistLvl === LINEUP_LEVELS.HEADLINERS) {
			li.classList.add(`${LINEUP.ARTIST_CLASS}--headliner`);
		} else {
			li.classList.add(`${LINEUP.ARTIST_CLASS}--${artistLvl}`);
		}

		if (artistKey[ARTIST_KEYS.DECORATOR]) {
			li.classList.add(artistDecoratorToClassMap[artistKey[ARTIST_KEYS.DECORATOR]]);
		}
		if (artistKey[ARTIST_KEYS.MARKED]) {
			li.classList.add(LINEUP.ARTIST_MARKED_CLASS);
		}
		if (artistKey[ARTIST_KEYS.MULTILINE]) {
			li.classList.add(LINEUP.ARTIST_MULTILINE_CLASS);
		}

		if (artistKey[ARTIST_KEYS.ALIGNED]) {
			li.classList.add(alignToClassMap[artistKey[ARTIST_KEYS.ALIGNED]])
		}

		if (artistKey[ARTIST_KEYS.FIRST_ON_LINE]) {
			li.classList.add(LINEUP.ARTIST_FIRST_ON_LINE_CLASS);

			if (index === 0) {
				target.classList.add(LINEUP.ARTISTS_NEW_LINE_CLASS);
			} else if (index > 0) {
				let newLine = document.createElement('li');

				newLine.classList.add(LINEUP.ARTISTS_NEW_LINE_ELEMENT_CLASS);

				fragment.appendChild(newLine);
			}
		}
		if (artistKey[ARTIST_KEYS.LAST_ON_LINE]) {
			li.classList.add(LINEUP.ARTIST_LAST_ON_LINE_CLASS);
		}
		if (artistKey[ARTIST_KEYS.LAST_ON_DAY]) {
			li.classList.add(LINEUP.ARTIST_LAST_ON_DAY_CLASS);
		}

		if (artistKey[ARTIST_KEYS.CANCELED]) {
			const span = document.createElement('span');

			span.classList.add(LINEUP.ARTIST_CANCELED_CLASS);
			span.textContent = artistName;
			li.title = ARTIST_CANCELED;
			li.dataset.canceledArtist = artistName;
			li.appendChild(span);
		}
		if (artistKey[ARTIST_KEYS.REPLACEMENT] && typeof artistKey[ARTIST_KEYS.REPLACEMENT] !== 'string') {
			li.classList.add(LINEUP.ARTIST_REPLACEMENT_CLASS);
		}

		if (artistKey[ARTIST_KEYS.SLICE_DECORATOR]) {
			li.append(this.artistSliceDecorator(artistName, artistKey[ARTIST_KEYS.SLICE_DECORATOR]));
		} else if (typeof artistKey[ARTIST_KEYS.REPLACEMENT] === 'string') {
			const spanReplacement = document.createElement('span');
			const spanCanceled = document.createElement('span');
			const canceledArtistEl = target.querySelector(`li[data-canceled-artist='${artistKey[ARTIST_KEYS.REPLACEMENT]}']`);

			spanReplacement.textContent = artistName;
			spanReplacement.classList.add(LINEUP.ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS);
			spanCanceled.textContent = canceledArtistEl.textContent;
			spanCanceled.classList.add(LINEUP.ARTIST_CANCELED_CLASS, LINEUP.ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS);
			spanCanceled.title = ARTIST_CANCELED;

			canceledArtistEl.textContent = '';
			canceledArtistEl.removeAttribute('title');
			canceledArtistEl.classList.remove(LINEUP.ARTIST_CANCELED_CLASS, LINEUP.ARTIST_COLLAPSED_CLASS, LINEUP.ARTIST_EXPANDED_CLASS);
			canceledArtistEl.classList.add(LINEUP.ARTIST_MULTIPLE_ARTISTS_CLASS);
			canceledArtistEl.appendChild(spanCanceled);
			canceledArtistEl.appendChild(spanReplacement);
		} else if (!artistKey[ARTIST_KEYS.CANCELED]) {
			li.textContent = artistName;
		}

		if (artistKey[ARTIST_KEYS.BREAK_LINE]) {
			const previousEl = target.querySelector(`li:last-child`);

			previousEl.classList.add(LINEUP.ARTIST_NEXT_LINE_ARTIST_CLASS);
			previousEl.dataset[ARTIST_KEYS.NEXT_LINE_ARTIST] = artistKey[ARTIST_KEYS.SLICE_DECORATOR][ARTIST_SLICES_PROPS.SLICE];
		}

		if (typeof artistKey[ARTIST_KEYS.REPLACEMENT] !== 'string') {
			fragment.appendChild(li);
			target.appendChild(fragment);
		}
	}

	getLineupByType() {
		switch(this.mergeArtists) {
			case true:
				return this.decorateLineupByLevels();
			case 'exceptHeadliners':
				return this.decorateLineupHeadlinersByDays();
			case 'customLevels':
				return this.decorateLineupCustomLevelsByDays();
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

			lineup[key].map((item, index) => {
				this.decorateArtist(item, ul, index, key);
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
						item[key].map((itemKey, index) => {
							this.decorateArtist(itemKey, ul, index, key);
						});
					});

					fragment.appendChild(ul);
				});
			} else {
				let ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[key]);

				lineup[key].map((item, index) => {
					this.decorateArtist(item, ul, index, key);
				});

				fragment.appendChild(ul);
			}
		});

		return fragment;
	}

	decorateLineupByDays() {
		let fragment = document.createDocumentFragment();
		const lineup = this.lineup;

		lineup.map((item, index) => {
			let section = document.createElement('section');
			const dayCount = index + 1;

			section.classList.add(LINEUP.ARTISTS_DAY_CLASS, `${LINEUP.ARTISTS_DAY_CLASS}--day${dayCount}`);

			Object.keys(item).map((key) => {
				let ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[key]);

				item[key].map((itemKey, index) => {
					this.decorateArtist(itemKey, ul, index, key);
				});

				section.appendChild(ul);
			});

			fragment.appendChild(section);
		});

		return fragment;
	}

	decorateLineupCustomLevelsByDays() {
		let fragment = document.createDocumentFragment();
		const lineup = this.lineup;

		// iteruj po dniach
		// utwórz sekcje dnia
		// utwórz rząd (linie)
		// iteruj po wszystkich levelach
		// jeżeli klucz 'line' zgadza się o odpowiednią linią dekoruj artyste


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
			closeAction: dialogbox.toggleDialogboxWithInactive,
			dataAttr: [['year', `${newYear}`]],
			title: `${DIALOGBOX_HEADLINE_TEXT} ${newYear}`,
			content: section,
			closeTitle: 'hide lineup details'
		});

		section.classList.add(DIALOGBOX.CONTENT_CLASS, LINEUP.ARTISTS_CLASS, `${LINEUP.ARTISTS_EDITION_CLASS}${newYear}`);
		section.appendChild(this.getLineupByType());

		return dialogboxLineup;
	}
}
