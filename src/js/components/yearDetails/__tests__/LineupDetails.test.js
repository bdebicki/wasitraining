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
				lineup.decorateArtist(artistsMock.multipleSlice, fragment);

				// then
				const artist = fragment.querySelector(`.${LINEUP.ARTIST_CLASS}`).innerHTML;
				const slice = fragment.querySelectorAll(`.${LINEUP.ARTIST_SLICE_CLASS}`);
				const firstSlice = '<span class="lineupArtists__slice lineupArtists__slice--down">with</span>';
				const secondSlice = '<span class="lineupArtists__slice lineupArtists__slice--multiline">Orchestra and Choir</span>'; // eslint-disable-line max-len
				expect(slice).toHaveLength(2);
				expect(slice[0].classList.contains(`${lineupClassBuilder.slice}--down`)).toBeTruthy();
				expect(slice[0].textContent).toBe('with');
				expect(slice[1].classList.contains(`${lineupClassBuilder.slice}--multiline`)).toBeTruthy();
				expect(slice[1].textContent).toBe('Orchestra and Choir');
				expect(artist.indexOf(firstSlice)).toBe(17);
				expect(artist.indexOf(secondSlice)).toBe(109);
			});
		});

		describe('artist class names', () => {
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

		it('display artist first on line', () => {

		});

		it('display artist on multiple lines', () => {

		});

		it('display artist with separator', () => {

		});

		it('display only visible artists', () => {

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
