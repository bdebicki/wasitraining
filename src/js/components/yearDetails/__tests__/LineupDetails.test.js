import * as artistsMock from '../../../../../tests/__mocks__/artists';
import mockedEdition from '../../../../../tests/__mocks__/edition-notSort-noMergeArtists.json';
import LineupDetails from '../LineupDetails';
import { LINEUP, lineupClassBuilder } from '../elementHandlers/lineup';
import { ARTIST_KEYS } from '../../../enums/artist';

describe('lineup details tests', () => {
	describe('single decorated artist (decorateArtist)', () => {
		// having
		let fragment;
		const lineup = new LineupDetails(mockedEdition);
		beforeEach(() => { fragment = document.createDocumentFragment(); });

		it('renders decorated artist element', () => {
			// when
			lineup.decorateArtist(artistsMock.artistObject, fragment);

			// then
			expect(fragment.querySelectorAll(`.${LINEUP.ARTIST_CLASS}`)).toHaveLength(1);
		});

		describe('artist additional classes', () => {
			it('add align class name', () => {

			});

			it('add lvl class name', () => {

			});

			it('add decorator class name', () => {

			});

			it('add marked class name', () => {

			});

			it('add multiline class name', () => {

			});
		});

		describe('artist with slice', () => {
			it('return artist with single slice decorator', () => {
				// when
				lineup.decorateArtist(artistsMock.slice, fragment);

				// then
				const slice = fragment.querySelectorAll(`.${LINEUP.ARTIST_SLICE_CLASS}`);
				expect(slice).toHaveLength(1);
				expect(slice[0].classList.contains(`${lineupClassBuilder.slice}--up`)).toBeTruthy();
				expect(slice[0].textContent).toBe('The');
			});

			it('return artist with multiple slice decorators', () => {
				// when
				lineup.decorateArtist(artistsMock.multipleSlice, fragment, 1, 'lvl1');

				// then
				expect(fragment).toMatchSnapshot();
			});
		});

		describe('artist name', () => {
			it('return artist from object', () => {
				// when
				lineup.decorateArtist(artistsMock.artistObject, fragment);

				// then
				expect(fragment.textContent).toBe('Pearl Jam');
			});

			it('return artist from string', () => {
				// when
				lineup.decorateArtist(artistsMock.artistString, fragment);

				// then
				expect(fragment.textContent).toBe('Pearl Jam');
			});

			it('return artist alternative display name', () => {
				// when
				lineup.decorateArtist(artistsMock.artistDisplayName, fragment);

				// then
				expect(fragment.textContent).toBe('Fisz Emade');
			});
		});

		describe('return canceled artist', () => {
			it('return clean canceled artist', () => {
				// when
				lineup.decorateArtist(artistsMock.canceled, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.CANCELED}`)).toBeTruthy();
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}`).title)
					.toBe('This artist\'s performance has been canceled');
			});

			it('return canceled artist with replacement', () => {
				// when
				artistsMock.canceledWithReplacement.forEach((artist) => lineup.decorateArtist(artist, fragment));

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
				lineup.decorateArtist(artistsMock.firstOnLine, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.FIRST_ON_LINE}`))
					.toBeTruthy();
			});

			it('display artist last on line', () => {
				// when
				lineup.decorateArtist(artistsMock.lastOnLine, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_LINE}`))
					.toBeTruthy();
			});

			it('display artist last on day', () => {
				// when
				lineup.decorateArtist(artistsMock.lastOnDay, fragment);

				// then
				expect(fragment.querySelector(`.${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_DAY}`))
					.toBeTruthy();
			});

			it('display artist with new line', () => {
				// when
				lineup.decorateArtist(artistsMock.newLine, fragment);

				// then
				expect(fragment).toMatchSnapshot();
			});

			it('display artist broken on two lines', () => {
				// when
				artistsMock.twoLines.forEach((artist, index) => lineup.decorateArtist(artist, fragment, index, 'lvl1'));

				// then
				expect(fragment).toMatchSnapshot();
			});

			it('display artist with separator', () => {
				// when
				lineup.decorateArtist(artistsMock.artistString, fragment, 1, 'lvl1', true);

				// then
				expect(fragment).toMatchSnapshot();
			});

			it('display artist with turned off separator', () => {
				// when
				lineup.decorateArtist(artistsMock.turnedOffSeparator, fragment, 1, 'lvl1', true);

				// then
				expect(fragment).toMatchSnapshot();
			});
		});
	});

	describe('decorated lineup by type', () => {
		it('artists on lineup by levels', () => {

		});

		it('main artists by days and merge others', () => {

		});

		it('artist on custom levels', () => {

		});

		it('artists on days', () => {

		});
	});

	describe('lineup dialogbox', () => {
		it('renders lineup dialogbox', () => {

		});

		it('update lineup dialogbox', () => {

		});

		it('rengers lineup link', () => {

		});
		it('toggle lineup dialogbox visibility', () => {

		});
	});
});
