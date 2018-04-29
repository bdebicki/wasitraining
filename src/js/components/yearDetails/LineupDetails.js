import Lineup from '../../classes/Lineup';
import { LINEUP, DIALOGBOX, LINK, EDITION } from '../../enums/elementHandlers';
import { LINEUP_LEVELS, ARTIST_KEYS, ARTIST_DECORATORS, ARTIST_SLICES_STYLES, ARTIST_SLICES_PROPS } from '../../enums/lineup';
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

export default class LineupDetails extends Lineup {
	static toggleLineup(e) {
		e.preventDefault();
		dialogbox.toggleDialogboxAction(`#${LINEUP.SECTION_ID}`);
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

	static getArtistClassNames(artist, artistLvl) {
		let classNames = [
			LINEUP.ARTIST_CLASS,
			artistLvl ? dailyLvlToClassMap[artistLvl] : null,
			artist[ARTIST_KEYS.DECORATOR] ? artistDecoratorToClassMap[artist[ARTIST_KEYS.DECORATOR]] : null,
			artist[ARTIST_KEYS.MARKED] ? LINEUP.ARTIST_MARKED_CLASS : null,
			artist[ARTIST_KEYS.MULTILINE] ? LINEUP.ARTIST_MULTILINE_CLASS : null,
			artist[ARTIST_KEYS.SEPARATOR_MIDDLE] ? LINEUP.ARTIST_SEPARATOR_MIDDLE_CLASS : null,
			artist[ARTIST_KEYS.CANCELED] ? LINEUP.ARTIST_CANCELED_CLASS : null,
			artist[ARTIST_KEYS.REPLACEMENT] ? LINEUP.ARTIST_REPLACEMENT_CLASS : null,
		];

		classNames = classNames.filter((className) => { // clean null records on array
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

	static decorateArtist(artist, target, artistLvl) {
		const li = document.createElement('li');
		const artistName = LineupDetails.getArtistName(artist);
		const artistClassNames = LineupDetails.getArtistClassNames(artist, artistLvl);

		if (artist[ARTIST_KEYS.SLICE_DECORATOR]) {
			li.append(LineupDetails.artistSliceDecorator(artistName, artist[ARTIST_KEYS.SLICE_DECORATOR]));
		} else {
			li.textContent = artistName;
		}

		li.classList.add(...artistClassNames);

		target.appendChild(li);
	}

	getLineupByType() {
		switch (this.mergeArtistsType) {
		case true:
			return this.decorateLineupByLevels();
		case 'exceptHeadliners':
			return this.decorateLineupHeadlinersByDays();
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

			lineup[lvl].forEach((artist) => {
				LineupDetails.decorateArtist(artist, ul);
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
						dailyArtists[dailyLvl].forEach((dailyArtist) => {
							LineupDetails.decorateArtist(dailyArtist, ul, dailyLvl);
						});
					});

					fragment.appendChild(ul);
				});
			} else {
				const ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[lvl]);

				lineup[lvl].forEach((artist) => {
					LineupDetails.decorateArtist(artist, ul);
				});

				fragment.appendChild(ul);
			}
		});

		return fragment;
	}

	decorateLineupByDays() {
		const fragment = document.createDocumentFragment();
		const { lineup } = this;

		lineup.forEach((day) => {
			const section = document.createElement('section');

			section.classList.add(LINEUP.ARTISTS_DAY_CLASS);

			Object.keys(day).forEach((lvl) => {
				const ul = document.createElement('ul');

				ul.classList.add(LINEUP.ARTISTS_LEVEL_CLASS, lineupLvlToClassMap[lvl]);

				day[lvl].forEach((artist) => {
					LineupDetails.decorateArtist(artist, ul);
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
			dataAttr: [['year', `${newYear}`]],
			title: `${DIALOGBOX_HEADLINE_TEXT} ${newYear}`,
			content: section,
			closeTitle: 'hide lineup details',
		});

		section.classList.add(LINEUP.ARTISTS_CLASS, `${LINEUP.ARTISTS_EDITION_CLASS}${newYear}`);
		section.appendChild(this.getLineupByType());

		return dialogboxLineup;
	}
}