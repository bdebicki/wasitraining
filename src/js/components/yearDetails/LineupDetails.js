import Lineup from '../../classes/Lineup';
import { LINEUP, DIALOGBOX, LINK, EDITION } from '../../enums/elementHandlers';
import { LINEUP_LEVELS, ARTIST_KEYS, ARTIST_DECORATORS, ARTIST_SLICES_STYLES, ARTIST_SLICES_PROPS, ARTIST_ALIGN } from '../../enums/lineup';
import { ARTIST_CANCELED } from '../../enums/content';
import * as dialogbox from '../../utils/addDialogbox';
import setIcon from '../../utils/setIcon';
import icons from '../../utils/iconsLibrary';

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

export default class LineupDetails extends Lineup {
	static toggleLineup(e) {
		e.preventDefault();
		dialogbox.toggleDialogboxAction(`#${LINEUP.SECTION_ID}`, `#${EDITION.EDITION_DETAILS_ID}`);
	}

	static renderLineupLink() {
		const p = document.createElement('p');
		const a = document.createElement('a');

		p.classList.add(EDITION.LINEUP_LINK_CLASS);
		a.classList.add(LINK.BASIC_CLASS, LINK.INVERTED_STYLE_CLASS, LINK.SIZE_XS_CLASS, LINK.HAS_ICON_CLASS);
		a.href = '#lineup';
		a.textContent = 'see full lineup';
		a.appendChild(setIcon(icons.plus(), `${LINK.ICON_CLASS}`));
		a.addEventListener('click', LineupDetails.toggleLineup, null);

		p.appendChild(a);

		return p;
	}

	static artistSliceDecorator(artistName, artistDecorations) {
		const decorations = artistDecorations;
		const multipleDecorations = Array.isArray(decorations);
		const name = artistName;
		const decoratedName = document.createElement('template'); // can't use document fragment with innerHtml method
		let replacePattern;

		if (!multipleDecorations) {
			replacePattern = decorations[ARTIST_SLICES_PROPS.SLICE];
		} else {
			replacePattern = new RegExp(
				decorations.map((item) => item[ARTIST_SLICES_PROPS.SLICE]).join('|'), 'gi'
			);
		}

		decoratedName.innerHTML = name.replace(replacePattern, (matched) => {
			let sliceStyleClassName = '';
			const setStyleClassName = (styleList) => {
				if (Array.isArray(styleList[ARTIST_SLICES_PROPS.STYLE])) {
					sliceStyleClassName = styleList[ARTIST_SLICES_PROPS.STYLE].map(
						(style) => artistSliceDecoratorToClassMap[style]
					).join(' ');
				} else {
					sliceStyleClassName = artistSliceDecoratorToClassMap[styleList[ARTIST_SLICES_PROPS.STYLE]];
				}
			};

			if (!multipleDecorations) {
				setStyleClassName(decorations);
			} else {
				decorations.forEach((decorationSlice) => {
					if (decorationSlice[ARTIST_SLICES_PROPS.SLICE] === matched) {
						setStyleClassName(decorationSlice);
					}
				});
			}
			return `<span class="${LINEUP.ARTIST_SLICE_CLASS} ${sliceStyleClassName}">${matched}</span>`;
		});

		return decoratedName.content;
	}

	static decorateArtist(artistKey, target, index, artistLvl) {
		const fragment = document.createDocumentFragment();
		const li = document.createElement('li');
		let artistName;

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

			if (index > 0) {
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

	// static getArtistClassNames(artist, artistLvl) {
	// 	let classNames = [
	// 		LINEUP.ARTIST_CLASS,
	// 		artistLvl ? dailyLvlToClassMap[artistLvl] : null,
	// 		artist[ARTIST_KEYS.DECORATOR] ? artistDecoratorToClassMap[artist[ARTIST_KEYS.DECORATOR]] : null,
	// 		artist[ARTIST_KEYS.MARKED] ? LINEUP.ARTIST_MARKED_CLASS : null,
	// 		artist[ARTIST_KEYS.MULTILINE] ? LINEUP.ARTIST_MULTILINE_CLASS : null,
	// 		artist[ARTIST_KEYS.SEPARATOR_MIDDLE] ? LINEUP.ARTIST_SEPARATOR_MIDDLE_CLASS : null,
	// 		artist[ARTIST_KEYS.CANCELED] ? LINEUP.ARTIST_CANCELED_CLASS : null,
	// 		artist[ARTIST_KEYS.REPLACEMENT] ? LINEUP.ARTIST_REPLACEMENT_CLASS : null,
	// 	];
	//
	// 	classNames = classNames.filter((className) => { // clean null records on array
	// 		if (className !== null) {
	// 			return className;
	// 		}
	//
	// 		return null;
	// 	});
	//
	// 	return classNames;
	// }
	//
	// static getArtistName(artist) {
	// 	let artistName;
	//
	// 	if (artist[ARTIST_KEYS.ARTIST] && !artist[ARTIST_KEYS.DISPLAY_NAME]) {
	// 		artistName = artist[ARTIST_KEYS.ARTIST];
	// 	} else if (artist[ARTIST_KEYS.DISPLAY_NAME]) {
	// 		artistName = artist[ARTIST_KEYS.DISPLAY_NAME];
	// 	} else {
	// 		artistName = artist;
	// 	}
	//
	// 	return artistName;
	// }
	//
	// static decorateArtist(artist, target, artistLvl) {
	// 	const li = document.createElement('li');
	// 	const artistName = LineupDetails.getArtistName(artist);
	// 	const artistClassNames = LineupDetails.getArtistClassNames(artist, artistLvl);
	//
	// 	if (artist[ARTIST_KEYS.SLICE_DECORATOR]) {
	// 		li.append(LineupDetails.artistSliceDecorator(artistName, artist[ARTIST_KEYS.SLICE_DECORATOR]));
	// 	} else {
	// 		li.textContent = artistName;
	// 	}
	//
	// 	li.classList.add(...artistClassNames);
	//
	// 	target.appendChild(li);
	// }

	getLineupByType() {
		switch (this.mergeArtistsType) {
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
		const fragment = document.createDocumentFragment();
		const { lineup } = this;

		Object.keys(lineup).forEach((lvl) => {
			const ul = document.createElement('ul');

			ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[lvl]);

			lineup[lvl].forEach((artist, index) => {
				LineupDetails.decorateArtist(artist, ul, index, lvl);
			});

			fragment.appendChild(ul);
		});

		return fragment;
	}

	decorateLineupHeadlinersByDays() {
		const fragment = document.createDocumentFragment();
		const { lineup } = this;

		Object.keys(lineup).forEach((lvl) => {
			if (lvl === LINEUP_LEVELS.DAILY_ARTISTS) {
				lineup[lvl].forEach((dailyArtists) => {
					const ul = document.createElement('ul');

					ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[lvl]);

					Object.keys(dailyArtists).forEach((dailyLvl) => {
						dailyArtists[dailyLvl].forEach((dailyArtist, index) => {
							LineupDetails.decorateArtist(dailyArtist, ul, index, dailyLvl);
						});
					});

					fragment.appendChild(ul);
				});
			} else {
				const ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[lvl]);

				lineup[lvl].forEach((artist, index) => {
					LineupDetails.decorateArtist(artist, ul, index, lvl);
				});

				fragment.appendChild(ul);
			}
		});

		return fragment;
	}

	decorateLineupByDays() {
		const fragment = document.createDocumentFragment();
		const { lineup } = this;

		lineup.forEach((day, index) => {
			const section = document.createElement('section');
			const dayCount = index + 1;

			section.classList.add(LINEUP.ARTISTS_DAY_CLASS, `${LINEUP.ARTISTS_DAY_CLASS}--day${dayCount}`);

			Object.keys(day).forEach((lvl) => {
				const ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[lvl]);

				day[lvl].forEach((artist, index) => {
					LineupDetails.decorateArtist(artist, ul, index, lvl);
				});

				section.appendChild(ul);
			});

			fragment.appendChild(section);
		});

		return fragment;
	}

	decorateLineupCustomLevelsByDays() {
		const fragment = document.createDocumentFragment();
		const lineup = this.lineup;
		const tempLineup = [];

		// merge all day artists in one array
		lineup.map((day, index) => {
			tempLineup.push([]); // create day key on tempLineup array

			Object.keys(day).map((level) => { // iterate on day
				day[level].map((artist) => { // iterate on level of specific day
					const arrLine = artist[ARTIST_KEYS.LINE] - 1;
					artist[ARTIST_KEYS.LEVEL] = level;

					if(tempLineup[index][arrLine] === undefined) { // create line if doesn't exist
						tempLineup[index].push([]);
					}

					tempLineup[index][arrLine].push(artist); // push artist into line
				});
			});
		});
		tempLineup.map((day, index) => {
			const section = document.createElement('section');
			const currentDay = index + 1;

			section.classList.add(LINEUP.ARTISTS_DAY_CLASS, `${LINEUP.ARTISTS_DAY_CLASS}--day${currentDay}`);

			day.map((line, index) => {
				const ul = document.createElement('ul');
				const currentLine = index + 1;

				ul.classList.add(LINEUP.ARTISTS_LINE_CLASS, `${LINEUP.ARTISTS_LINE_CLASS}--line${currentLine}`);

				line.map((artist) => {
					this.decorateArtist(artist, ul, index, artist[ARTIST_KEYS.LEVEL]);
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

		// eslint-disable-next-line max-len
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
		const section = document.createElement('section');
		const newYear = this.editionYear;

		const dialogboxLineup = dialogbox.addDialogbox({
			id: LINEUP.SECTION_ID,
			classNames: [`${LINEUP.EDITION_CLASS}${newYear}`, 'dialogbox--isVisible'],
			closeAction: dialogbox.toggleDialogboxWithInactive,
			dataAttr: [['year', `${newYear}`]],
			title: `${DIALOGBOX_HEADLINE_TEXT} ${newYear}`,
			content: section,
			closeTitle: 'hide lineup details',
		});

		section.classList.add(DIALOGBOX.CONTENT_CLASS, LINEUP.ARTISTS_CLASS, `${LINEUP.ARTISTS_EDITION_CLASS}${newYear}`);
		section.appendChild(this.getLineupByType());

		return dialogboxLineup;
	}
}
