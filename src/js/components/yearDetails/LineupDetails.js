import Lineup from '../../classes/Lineup';
import { ARTIST_KEYS, ARTIST_SLICES_PROPS, ARTIST_ON_LINE_KEYS } from '../../enums/artist';
import { ARTIST_CANCELED } from '../../enums/content';
import LINEUP_LEVELS from '../../enums/lineupLevels';
import { OTHER_ARTISTS, LOCATION_TYPES } from '../../enums/otherArtists';
import DIALOGBOX from '../../utils/elementHandlers/dialogbox';
import { EDITION } from './elementHandlers/edition';
import { LINEUP } from './elementHandlers/lineup';
import LINK from '../../elementHandlers/link';
import addElement from '../../utils/addElement';
import * as dialogbox from '../../utils/addDialogbox';
import setIcon from '../../utils/setIcon';
import icons from '../../helpers/iconsLibrary';
import getAlignClassName from './classNames/getAlignClassName';
import getModifierClassNameByKey from './classNames/getModifierClassNameByKey';
import getLineupLvlClassName from './classNames/getLineupLvlClassName';
import getSeparatorElementLvlClassName from './classNames/getSeparatorElementLvlClassName';
import getSliceDecoratorClassName from './classNames/getSliceDecoratorClassName';
import getArtistLvlClassName from './classNames/getArtistLvlClassName';

const DIALOGBOX_HEADLINE_TEXT = 'Lineup';

export default class LineupDetails extends Lineup {
	static toggleLineup(e) {
		e.preventDefault();
		dialogbox.toggleDialogboxAction(`#${LINEUP.SECTION_ID}`, `#${EDITION.EDITION_DETAILS_ID}`);
	}

	static renderLineupLink() {
		const aSettings = {
			children: [
				'see full lineup',
				setIcon(icons.plus(), `${LINK.ICON_CLASS}`),
			],
			classNames: [
				LINK.BASIC_CLASS,
				LINK.INVERTED_STYLE_CLASS,
				LINK.SIZE_XS_CLASS,
				LINK.HAS_ICON_CLASS,
			],
			href: '#lineup',
			onClick: LineupDetails.toggleLineup,
		};
		const pSettings = {
			children: addElement('a', aSettings),
			classNames: EDITION.LINEUP_LINK_CLASS,
		};

		return addElement('p', pSettings);
	}

	static getArtistSliceDecorator(artistName, artistDecorations) {
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
				if (!styleList[ARTIST_SLICES_PROPS.STYLE]) {
					return;
				}

				if (Array.isArray(styleList[ARTIST_SLICES_PROPS.STYLE])) {
					sliceStyleClassName = styleList[ARTIST_SLICES_PROPS.STYLE].map(
						(style) => getSliceDecoratorClassName(style)
					).join(' ');
				} else {
					sliceStyleClassName = getSliceDecoratorClassName(styleList[ARTIST_SLICES_PROPS.STYLE]);
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

	static getArtistReplacementDecorator(artist, artistName, target) {
		const canceledArtistEl = target.querySelector(`li[data-canceled-artist='${artist[ARTIST_KEYS.REPLACEMENT]}']`);
		const redundantDecoratorClassNames = getModifierClassNameByKey([
			ARTIST_KEYS.CANCELED,
			ARTIST_KEYS.COLLAPSED,
			ARTIST_KEYS.EXPANDED,
		]);
		const spanReplacement = addElement('span', {
			children: artistName,
			classNames: LINEUP.ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS,
		});
		const spanCanceled = addElement('span', {
			children: canceledArtistEl.textContent,
			classNames: [
				getModifierClassNameByKey(ARTIST_KEYS.CANCELED),
				LINEUP.ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS,
			],
			title: ARTIST_CANCELED,
		});

		// clean current existing canceled artist and put canceled artist with replacement
		canceledArtistEl.textContent = '';
		canceledArtistEl.removeAttribute('title');
		canceledArtistEl.classList.remove(...redundantDecoratorClassNames);
		canceledArtistEl.classList.add(LINEUP.ARTIST_MULTIPLE_ARTISTS_CLASS);
		canceledArtistEl.appendChild(spanCanceled);
		canceledArtistEl.appendChild(spanReplacement);
	}

	static getArtistClassNames(artist, artistLvl) {
		const isFirstOnLine = artist[ARTIST_KEYS.FIRST_ON_LINE] === ARTIST_ON_LINE_KEYS.LINEUP;
		const isLastOnLine = artist[ARTIST_KEYS.LAST_ON_LINE] === ARTIST_ON_LINE_KEYS.LINEUP;
		let classNames = [
			LINEUP.ARTIST_CLASS,
			getAlignClassName(artist[ARTIST_KEYS.ALIGNED]),
			getArtistLvlClassName(artistLvl),
			getModifierClassNameByKey(artist[ARTIST_KEYS.DECORATOR]),
			getModifierClassNameByKey(artist[ARTIST_KEYS.MARKED] ? ARTIST_KEYS.MARKED : false),
			getModifierClassNameByKey(artist[ARTIST_KEYS.MULTILINE] ? ARTIST_KEYS.MULTILINE : false),
			getModifierClassNameByKey(isFirstOnLine ? ARTIST_KEYS.FIRST_ON_LINE : false),
			getModifierClassNameByKey(isLastOnLine ? ARTIST_KEYS.LAST_ON_LINE : false),
			getModifierClassNameByKey(artist[ARTIST_KEYS.LAST_ON_DAY] ? ARTIST_KEYS.LAST_ON_DAY : false),
		];

		classNames = classNames
			.reduce((acc, className) => acc.concat(className), [])
			.filter((className) => { // clean null records on array
				if (className !== null) {
					return className;
				}

				return null;
			});

		return classNames;
	}

	static getArtistName(artist) {
		let artistName;

		if (artist[ARTIST_KEYS.ARTIST] && !artist[ARTIST_KEYS.DISPLAY_NAME]) {
			artistName = artist[ARTIST_KEYS.ARTIST];
		} else if (artist[ARTIST_KEYS.DISPLAY_NAME]) {
			artistName = artist[ARTIST_KEYS.DISPLAY_NAME];
		} else {
			artistName = artist;
		}

		return artistName;
	}

	static artistFirstOnLineDecorator(artist, target) {
		const newLine = addElement('li', {
			classNames: LINEUP.ARTISTS_NEW_LINE_ELEMENT_CLASS,
		});

		target.appendChild(newLine);
	}

	static artistBreakLineDecorator(artist, target) {
		const previousEl = target.querySelector('li:last-child');

		previousEl.classList.add(getModifierClassNameByKey(ARTIST_KEYS.NEXT_LINE_ARTIST));
		previousEl.dataset[ARTIST_KEYS.NEXT_LINE_ARTIST] = artist[ARTIST_KEYS.SLICE_DECORATOR][ARTIST_SLICES_PROPS.SLICE]; // eslint-disable-line max-len
	}

	static artistCanceledDecorator(artist, artistName, target) {
		const targetEl = target;
		const span = addElement('span', {
			children: artistName,
			classNames: getModifierClassNameByKey(ARTIST_KEYS.CANCELED),
		});

		targetEl.title = ARTIST_CANCELED;
		targetEl.dataset.canceledArtist = artistName;
		targetEl.appendChild(span);
	}

	static addSeparatorElement(target, lvl, element = 'li') {
		const separatorEl = addElement(element, {
			classNames: [
				LINEUP.ARTISTS_SEPARATOR_ELEMENT_CLASS,
				getSeparatorElementLvlClassName(lvl),
			],
		});

		target.appendChild(separatorEl);
	}

	/* eslint-disable complexity */
	static decorateArtist(artist, target, index, lvl, separatorElement) {
		const fragment = document.createDocumentFragment();
		const li = document.createElement('li');
		const artistObj = artist;
		const artistName = LineupDetails.getArtistName(artistObj);
		const artistClassNames = LineupDetails.getArtistClassNames(artistObj, lvl);
		const hasSliceDecorator = artistObj[ARTIST_KEYS.SLICE_DECORATOR];
		const hasSeparatorElement = separatorElement;
		const isFirstOnLine = artistObj[ARTIST_KEYS.FIRST_ON_LINE];
		const isNewLine = artistObj[ARTIST_KEYS.NEW_LINE];
		const isBreakLine = artistObj[ARTIST_KEYS.BREAK_LINE];
		const isCanceled = artistObj[ARTIST_KEYS.CANCELED];
		const artistReplacement = artistObj[ARTIST_KEYS.REPLACEMENT];

		if (hasSeparatorElement && !isFirstOnLine && !artistObj[ARTIST_KEYS.SKIP_SEPARATOR]) {
			LineupDetails.addSeparatorElement(fragment, lvl);
		}

		if ((isFirstOnLine && index > 0) || isNewLine) {
			LineupDetails.artistFirstOnLineDecorator(artistObj, fragment);
		}

		if (isBreakLine) {
			LineupDetails.artistBreakLineDecorator(artistObj, target);
		}

		if (isCanceled) {
			LineupDetails.artistCanceledDecorator(artistObj, artistName, li);
		}

		if (hasSliceDecorator) {
			li.append(LineupDetails.getArtistSliceDecorator(artistName, artistObj[ARTIST_KEYS.SLICE_DECORATOR]));
		} else if (typeof artistReplacement === 'string') {
			LineupDetails.getArtistReplacementDecorator(artistObj, artistName, target);
		} else if (!isCanceled) {
			li.textContent = artistName;
		}

		li.classList.add(...artistClassNames);

		if (typeof artistReplacement !== 'string') {
			fragment.appendChild(li);
			target.appendChild(fragment);
		}
	}
	/* eslint-enable complexity */

	static decorateOtherArtistsInfo(target, otherArtists) {
		if (otherArtists[OTHER_ARTISTS.LOCATION] === LOCATION_TYPES.BELOW_LINEUP) {
			const settings = {
				children: otherArtists[OTHER_ARTISTS.LABEL],
				classNames: LINEUP.ARTISTS_OTHERS_CLASS,
			};

			target.appendChild(addElement('p', settings));
		}
	}

	static decorateOtherArtistsLabel(target, otherArtists) {
		if (otherArtists[OTHER_ARTISTS.LOCATION] === LOCATION_TYPES.OTHERS_LVL) {
			const el = target;

			el.classList.add(LINEUP.ARTISTS_LEVEL_OTHERS_LABEL_CLASS);
			el.dataset.otherArtistsLabel = otherArtists[OTHER_ARTISTS.LABEL];
		}
	}

	getLineupByType() {
		switch (this.mergeArtistsType) {
		case true:
			return this.decorateLineupByLevels();
		case 'mainByDaysAndMergeRest':
			return this.decorateMainByDaysAndMergeRest();
		case 'customLevels':
			return this.decorateLineupCustomLevelsByDays();
		default:
			return this.decorateLineupByDays();
		}
	}

	decorateLineupByLevels() {
		const fragment = document.createDocumentFragment();
		const { lineup, separatorElement } = this;

		Object.keys(lineup).forEach((lvl) => {
			const ul = addElement('ul', {
				classNames: [
					LINEUP.ARTISTS_LEVEL_CLASS,
					getLineupLvlClassName(lvl),
				],
			});

			lineup[lvl].forEach((artist, index) => {
				LineupDetails.decorateArtist(artist, ul, index, lvl, separatorElement);
			});

			fragment.appendChild(ul);
		});

		return fragment;
	}

	decorateMainByDaysAndMergeRest() {
		const fragment = document.createDocumentFragment();
		const { lineup, otherArtists, separatorElement } = this;

		Object.keys(lineup).forEach((section) => {
			if (section === LINEUP_LEVELS.DAILY_ARTISTS) {
				lineup[section].forEach((dailyArtists, dayIndex) => {
					const dayCount = dayIndex + 1;
					const ul = addElement('ul', {
						classNames: [
							LINEUP.ARTISTS_LEVEL_CLASS,
							getLineupLvlClassName(section),
							`${LINEUP.ARTISTS_LEVEL_CLASS}--day${dayCount}`,
						],
					});

					Object.keys(dailyArtists).forEach((dailyLvl) => {
						dailyArtists[dailyLvl].forEach((dailyArtist, dailyArtistIndex) => {
							LineupDetails.decorateArtist(dailyArtist, ul, dailyArtistIndex, dailyLvl, separatorElement);
						});
					});

					fragment.appendChild(ul);
				});
			} else if (section === LINEUP_LEVELS.ALL_OTHERS) {
				const ul = addElement('ul', {
					classNames: [
						LINEUP.ARTISTS_LEVEL_CLASS,
						getLineupLvlClassName(section),
					],
				});

				Object.keys(lineup[section]).forEach((lvl) => {
					lineup[section][lvl].forEach((artist, index) => {
						LineupDetails.decorateArtist(artist, ul, index, lvl, separatorElement);
					});
				});

				LineupDetails.decorateOtherArtistsLabel(ul, otherArtists);

				fragment.appendChild(ul);
			}
		});

		return fragment;
	}

	decorateLineupByDays() {
		const fragment = document.createDocumentFragment();
		const { lineup, otherArtists } = this;

		lineup.forEach((day, index) => {
			const dayCount = index + 1;
			const section = addElement('section', {
				classNames: [
					LINEUP.ARTISTS_DAY_CLASS,
					`${LINEUP.ARTISTS_DAY_CLASS}--day${dayCount}`,
				],
			});

			Object.keys(day).forEach((lvl) => {
				const ul = addElement('ul', {
					classNames: [
						LINEUP.ARTISTS_LEVEL_CLASS,
						getLineupLvlClassName(lvl),
					],
				});

				day[lvl].forEach((artist, artistIndex) => {
					LineupDetails.decorateArtist(artist, ul, artistIndex, lvl);
				});

				section.appendChild(ul);
			});

			fragment.appendChild(section);
		});

		LineupDetails.decorateOtherArtistsInfo(fragment, otherArtists);

		return fragment;
	}

	decorateLineupCustomLevelsByDays() {
		const fragment = document.createDocumentFragment();
		const { lineup, separatorElement } = this;
		const tempLineup = [];

		// merge all day artists in one array
		lineup.forEach((day, index) => {
			tempLineup.push([]); // create day key on tempLineup array

			Object.keys(day).forEach((level) => { // iterate on day
				day[level].forEach((artist) => { // iterate on level of specific day
					const artistObj = artist;
					const artistLine = artistObj[ARTIST_KEYS.LINE] - 1;
					artistObj[ARTIST_KEYS.LEVEL] = level;

					if (tempLineup[index][artistLine] === undefined) { // create line if doesn't exist
						// check does previous line exist; if not add empty arrays for lines above
						for (let i = 0; i <= artistLine; i++) {
							if (tempLineup[index][i] === undefined) {
								tempLineup[index].push([]);
							}
						}
					}

					tempLineup[index][artistLine].push(artistObj); // push artist into line
				});
			});
		});
		tempLineup.forEach((day, index) => {
			const currentDay = index + 1;
			const section = addElement('section', {
				classNames: [
					LINEUP.ARTISTS_DAY_CLASS,
					`${LINEUP.ARTISTS_DAY_CLASS}--day${currentDay}`,
				],
			});

			day.forEach((line, lineIndex) => {
				if (line.length === 0) {
					return;
				}

				const currentLine = lineIndex + 1;
				const ul = addElement('ul', {
					classNames: [
						LINEUP.ARTISTS_LINE_CLASS,
						`${LINEUP.ARTISTS_LINE_CLASS}--line${currentLine}`,
					],
				});

				line.forEach((artist, artistIndex) => {
					LineupDetails.decorateArtist(artist, ul, artistIndex, artist[ARTIST_KEYS.LEVEL], separatorElement);
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

		lineupContainer.querySelector(`.${DIALOGBOX.HEADLINE_CLASS}`).textContent = `${DIALOGBOX_HEADLINE_TEXT} ${newYear}`; // eslint-disable-line max-len
		lineupContainer.classList.remove(`${LINEUP.EDITION_CLASS}${oldYear}`);
		lineupContainer.classList.add(`${LINEUP.EDITION_CLASS}${newYear}`);
		lineupContainer.dataset.year = newYear;
		artistsContainer.textContent = '';
		artistsContainer.classList.remove(`${LINEUP.ARTISTS_EDITION_CLASS}${oldYear}`);
		artistsContainer.classList.add(`${LINEUP.ARTISTS_EDITION_CLASS}${newYear}`);
		artistsContainer.appendChild(this.getLineupByType());
	}

	render() {
		const newYear = this.editionYear;
		const section = addElement('section', {
			children: this.getLineupByType(),
			classNames: [
				DIALOGBOX.CONTENT_CLASS,
				LINEUP.ARTISTS_CLASS,
				`${LINEUP.ARTISTS_EDITION_CLASS}${newYear}`,
			],
		});

		return dialogbox.addDialogbox({
			id: LINEUP.SECTION_ID,
			classNames: [`${LINEUP.EDITION_CLASS}${newYear}`],
			closeAction: dialogbox.toggleDialogboxWithInactive,
			dataAttr: { year: newYear },
			title: `${DIALOGBOX_HEADLINE_TEXT} ${newYear}`,
			content: section,
			closeTitle: 'hide lineup details',
		});
	}
}
