import * as artistsMock from '../../../../../tests/__mocks__/artists';
import mockedEdition from '../../../../../tests/__mocks__/edition-notSort-noMergeArtists.json';
import LineupDetails from '../LineupDetails';

describe('lineup details tests', () => {
	describe('single decorated artist (decorateArtist)', () => {
		// having
		const lineup = new LineupDetails(mockedEdition);

		it('renders decorated artist element', () => {
			// having
			const fragment = document.createDocumentFragment();

			// when
			lineup.decorateArtist(artistsMock.artistObject, fragment);

			// then
			expect(fragment.querySelectorAll('li')).toHaveLength(1);
		});

		describe('artist with slice', () => {

		});

		describe('artist class names', () => {
		});

		describe('artist name', () => {
			it('return artist from object', () => {
				// having
				const fragment = document.createDocumentFragment();

				// when
				lineup.decorateArtist(artistsMock.artistObject, fragment);

				// then
				expect(fragment.textContent).toBe('Pearl Jam');
			});

			it('return artist from string', () => {
				// having
				const fragment = document.createDocumentFragment();

				// when
				lineup.decorateArtist(artistsMock.artistString, fragment);

				// then
				expect(fragment.textContent).toBe('Pearl Jam');
			});

			it('return artist alternative display name', () => {
				// having
				const fragment = document.createDocumentFragment();

				// when
				lineup.decorateArtist(artistsMock.artistDisplayName, fragment);

				// then
				expect(fragment.textContent).toBe('Fisz Emade');
			});
		});

		describe('return canceled artist', () => {

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
