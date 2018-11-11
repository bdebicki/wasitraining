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
  ARTISTS_EDITION_CLASS: `${lineupClassBuilder.artists}--edition`,
  ARTISTS_DAY_CLASS: `${lineupClassBuilder.artists}__day`,
  ARTISTS_NEW_LINE_ELEMENT_CLASS: `${lineupClassBuilder.artists}__newLine`,
  ARTISTS_SEPARATOR_ELEMENT_CLASS: `${lineupClassBuilder.artists}__separatorElement`,
  ARTISTS_LINE_CLASS: lineupClassBuilder.line,
  ARTISTS_LEVEL_CLASS: lineupClassBuilder.lvl,
  ARTIST_CLASS: lineupClassBuilder.artist,
  ARTIST_MULTIPLE_ARTISTS_CLASS: lineupClassBuilder.multipleArtists,
  ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS: `${lineupClassBuilder.multipleArtists}__artist`,
  ARTIST_SLICE_CLASS: `${lineupClassBuilder.slice}`,
};

export {
  lineupClassBuilder,
  LINEUP,
};
