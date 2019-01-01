import * as artistsMock from '../../../../../tests/__mocks__/artists';
import editionCustomLevels from '../../../../../tests/__mocks__/edition-notSort-customLevels.json';
import editionMerged from '../../../../../tests/__mocks__/edition-customOrder-mergeArtists.json';
import editionMainByDaysAndMergeRest from '../../../../../tests/__mocks__/edition-customOrderExceptHeadliners-mainByDaysAndMergeRest.json';
import editionNotMerged from '../../../../../tests/__mocks__/edition-alphabeticalExceptHeadliners-noMergeArtists.json';
import LineupDetails from '../LineupDetails';
import EditionDetails from '../EditionDetails';
import { ARTIST_KEYS } from '../../../enums/artist';
import DIALOGBOX from '../../../utils/elementHandlers/dialogbox';
import { LINEUP, lineupClassBuilder } from '../elementHandlers/lineup';
import { EDITION } from '../elementHandlers/edition';
import LINK from '../../../elementHandlers/link';

describe('lineup details tests', () => {
	describe('single decorated artist (decorateArtist)', () => {
		// having
		let fragment;
		beforeEach(() => { fragment = document.createDocumentFragment(); });

		it('renders decorated artist element', () => {
			// when
			LineupDetails.decorateArtist(artistsMock.artistObject, fragment);

			// then
			expect(fragment.querySelectorAll(`.${LINEUP.ARTIST_CLASS}`)).toHaveLength(1);
		});

		describe('artist additional classes', () => {
			it('add lvl class name', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.artistString, fragment, 1, 'headliners');

				// then
				expect(fragment.querySelector(`.${LINEUP.ARTIST_CLASS}--headliner`)).toBeTruthy();
			});

			it('add align class name', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.aligned, fragment);

				// then
				expect(fragment.querySelector(`.${LINEUP.ARTIST_CLASS}--rightAligned`)).toBeTruthy();
			});

			it('add decorator class name', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.decorator, fragment);

				// then
				expect(fragment.querySelector(`.${LINEUP.ARTIST_CLASS}--promoted`)).toBeTruthy();
			});

			it('add multiple decorators class name', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.multipleDecorator, fragment);

				// then
				expect(fragment.querySelector(`.${LINEUP.ARTIST_CLASS}--expanded`)).toBeTruthy();
				expect(fragment.querySelector(`.${LINEUP.ARTIST_CLASS}--wordExpandHeavy`)).toBeTruthy();
			});

			it('add marked class name', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.marked, fragment);

				// then
				expect(fragment.querySelector(`.${LINEUP.ARTIST_CLASS}--marked`)).toBeTruthy();
			});

			it('add multiline class name', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.multiline, fragment);

				// then
				expect(fragment.querySelector(`.${LINEUP.ARTIST_CLASS}--multiline`)).toBeTruthy();
			});
		});

		describe('artist with slice', () => {
			it('return artist with single slice decorator', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.slice, fragment);

				// then
				const slice = fragment.querySelectorAll(`.${LINEUP.ARTIST_SLICE_CLASS}`);
				expect(slice).toHaveLength(1);
				expect(slice[0].classList.contains(`${lineupClassBuilder.slice}--up`)).toBeTruthy();
				expect(slice[0].textContent).toBe('The');
			});

			it('return artist with slice and without slice style', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.sliceWithoutStyles, fragment);

				// then
				expect(fragment.querySelector(`.${LINEUP.ARTIST_SLICE_CLASS}`).classList).toHaveLength(1);
			});

			it('return artist with multiple slice decorators', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.multipleSlice, fragment, 1, 'lvl1');

				// then
				expect(fragment).toMatchSnapshot();
			});

			it('return artist with multiple decorators for slice', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.multipleSliceStyles, fragment, 1, 'lvl1');

				// then
				const slice = fragment.querySelector(`.${LINEUP.ARTIST_SLICE_CLASS}`);
				expect(slice.classList.contains(`${LINEUP.ARTIST_SLICE_CLASS}--newLine`)).toBeTruthy();
				expect(slice.classList.contains(`${LINEUP.ARTIST_SLICE_CLASS}--indented`)).toBeTruthy();
			});
		});

		describe('artist name', () => {
			it('return artist from object', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.artistObject, fragment);

				// then
				expect(fragment.textContent).toBe('Pearl Jam');
			});

			it('return artist from string', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.artistString, fragment);

				// then
				expect(fragment.textContent).toBe('Pearl Jam');
			});

			it('return artist alternative display name', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.artistDisplayName, fragment);

				// then
				expect(fragment.textContent).toBe('Fisz Emade');
			});
		});

		describe('return canceled artist', () => {
			it('return clean canceled artist', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.canceled, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.CANCELED}`)).toBeTruthy();
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}`).title)
					.toBe('This artist\'s performance has been canceled');
			});

			it('return canceled artist with replacement', () => {
				// when
				artistsMock.canceledWithReplacement.forEach((artist) => LineupDetails.decorateArtist(artist, fragment));

				// then
				const artist = fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.CANCELED}`);
				expect(artist).toBeTruthy();
				expect(artist.title).toBe('This artist\'s performance has been canceled');
				expect(fragment.querySelectorAll(`.${LINEUP.ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS}`)).toHaveLength(2);
			});
		});

		describe('return artist with position options', () => {
			it('display artist first on line', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.firstOnLineLineup, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.FIRST_ON_LINE}`))
					.toBeTruthy();
			});

			it('display artist last on line', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.lastOnLineLineup, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_LINE}`))
					.toBeTruthy();
			});

			it('display artist last on day', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.lastOnDay, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_DAY}`))
					.toBeTruthy();
			});

			it('display artist with new line', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.newLine, fragment);

				// then
				expect(fragment).toMatchSnapshot();
			});

			it('display artist broken on two lines', () => {
				// when
				artistsMock.twoLines.forEach(
					(artist, index) => LineupDetails.decorateArtist(artist, fragment, index, 'lvl1')
				);

				// then
				expect(fragment).toMatchSnapshot();
			});

			it('display artist with separator', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.artistString, fragment, 1, 'lvl1', true);

				// then
				expect(fragment).toMatchSnapshot();
			});

			it('display artist with turned off separator', () => {
				// when
				LineupDetails.decorateArtist(artistsMock.turnedOffSeparator, fragment, 1, 'lvl1', true);

				// then
				expect(fragment).toMatchSnapshot();
			});
		});
	});

	describe('decorated lineup by type', () => {
		it('artists on lineup by levels', () => {
			// having
			const lineup = new LineupDetails(editionMerged);

			// when
			const decoratedLineup = lineup.getLineupByType();

			// then
			expect(decoratedLineup).toMatchSnapshot();
		});

		it('main artists by days and merge others', () => {
			// having
			const lineup = new LineupDetails(editionMainByDaysAndMergeRest);

			// when
			const decoratedLineup = lineup.getLineupByType();

			// then
			expect(decoratedLineup).toMatchSnapshot();
		});

		it('artist on custom levels', () => {
			// having
			const lineup = new LineupDetails(editionCustomLevels);

			// when
			const decoratedLineup = lineup.getLineupByType();

			// then
			expect(decoratedLineup).toMatchSnapshot();
		});

		it('artists on days', () => {
			// having
			const lineup = new LineupDetails(editionNotMerged);

			// when
			const decoratedLineup = lineup.getLineupByType();

			// then
			expect(decoratedLineup).toMatchSnapshot();
		});
	});

	describe('lineup dialogbox', () => {
		const lineup = new LineupDetails(editionCustomLevels);

		it('renders lineup dialogbox', () => {
			// having
			const basicLineup = new LineupDetails(editionMerged);

			// when
			document.body.appendChild(basicLineup.render());

			// then
			const dialogbox = document.getElementById(LINEUP.SECTION_ID);
			expect(dialogbox).toBeTruthy();
			expect(dialogbox.dataset.year).toBe('2007');
		});

		it('update lineup dialogbox', () => {
			// when
			lineup.updateLineupDetails();

			// then
			expect(document.getElementById(LINEUP.SECTION_ID).dataset.year).toBe('2004');
		});

		it('renders lineup link', () => {
			// having
			document.body.appendChild(LineupDetails.renderLineupLink());

			// then
			expect(document.querySelectorAll(`.${EDITION.LINEUP_LINK_CLASS}`)).toHaveLength(1);
		});

		it('toggle (show) lineup dialogbox visibility', () => {
			// having
			const details = new EditionDetails(editionCustomLevels);
			document.body.appendChild(details.renderEditionContainer());

			// when
			document.querySelector(`.${EDITION.LINEUP_LINK_CLASS} .${LINK.BASIC_CLASS}`).click();

			// then
			expect(document.getElementById(LINEUP.SECTION_ID).classList.contains(DIALOGBOX.VISIBLE_CLASS)).toBeTruthy();
		});
	});
});
