import { ARTIST_KEYS } from '../enums/artist';

const lineupClassBuilder = {
	section: 'lineup',
	artists: 'lineupArtists',
	line: 'lineupArtists__line',
	lvl: 'lineupArtists__lvl',
	artist: 'lineupArtists__artist',
	slice: 'lineupArtists__slice',
	multipleArtists: 'lineupArtists__multipleArtists',
};
const LINEUP = {
	SECTION_ID: lineupClassBuilder.section,
	EDITION_CLASS: `${lineupClassBuilder.section}--edition`,
	ARTISTS_CLASS: lineupClassBuilder.artists,
	ARTISTS_NEW_LINE_CLASS: `${lineupClassBuilder.artists}--newLine`,
	ARTISTS_EDITION_CLASS: `${lineupClassBuilder.artists}--edition`,
	ARTISTS_DAY_CLASS: `${lineupClassBuilder.artists}__day`,
	ARTISTS_NEW_LINE_ELEMENT_CLASS: `${lineupClassBuilder.artists}__newLine`,
	ARTISTS_SEPARATOR_ELEMENT_CLASS: `${lineupClassBuilder.artists}__separatorElement`,
	ARTISTS_LINE_CLASS: lineupClassBuilder.line,
	ARTISTS_LEVEL_CLASS: lineupClassBuilder.lvl,
	ARTIST_CLASS: lineupClassBuilder.artist,
	ARTIST_CANCELED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.CANCELED}`,
	ARTIST_REPLACEMENT_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.REPLACEMENT}`, // never used
	ARTIST_FIRST_ON_LINE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.FIRST_ON_LINE}`,
	ARTIST_LAST_ON_LINE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_LINE}`,
	ARTIST_LAST_ON_DAY_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_DAY}`,
	ARTIST_NEXT_LINE_ARTIST_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.NEXT_LINE_ARTIST}`,
	ARTIST_MULTIPLE_ARTISTS_CLASS: lineupClassBuilder.multipleArtists,
	ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS: `${lineupClassBuilder.multipleArtists}__artist`,
	ARTIST_SLICE_CLASS: `${lineupClassBuilder.slice}`,
};

export {
	lineupClassBuilder,
	LINEUP,
};
