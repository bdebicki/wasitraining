import LINEUP_LEVELS from '../enums/lineupLevels';
import { ARTIST_DECORATORS, ARTIST_SLICES_STYLES, ARTIST_KEYS, ARTIST_ALIGN } from '../enums/artist';
import globalClassBuilders from './globalClassBuilders';
import LAYOUT from './layout';

const lineupClassBuilder = {
	section: 'lineup',
	artists: 'lineupArtists',
	line: 'lineupArtists__line',
	lvl: 'lineupArtists__lvl',
	artist: 'lineupArtists__artist',
	slice: 'lineupArtists__slice',
	multipleArtists: 'lineupArtists__multipleArtists',
};
export const LINEUP = {
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
	ARTISTS_HEADLINERS_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.HEADLINERS}`,
	ARTISTS_LVL1_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL1}`,
	ARTISTS_LVL2_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL2}`,
	ARTISTS_LVL3_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL3}`,
	ARTISTS_LVL4_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL4}`,
	ARTISTS_OTHERS_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.OTHERS}`,
	ARTISTS_DAILY_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.DAILY_ARTISTS}`,
	ARTISTS_ALL_OTHERS_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.ALL_OTHERS}`,
	ARTIST_CLASS: `${lineupClassBuilder.artist}`,
	ARTIST_PROMOTED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.PROMOTED}`,
	ARTIST_EXPANDED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.EXPANDED}`,
	ARTIST_COMPRESSED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.COMPRESSED}`,
	ARTIST_COLLAPSED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.COLLAPSED}`,
	ARTIST_UPPERCASE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.UPPERCASE}`,
	ARTIST_CAPITALIZE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.CAPITALIZE}`,
	ARTIST_WORD_EXPAND_MEDIUM_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.WORD_EXPAND_MEDIUM}`,
	ARTIST_WORD_EXPAND_HEAVY_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.WORD_EXPAND_HEAVY}`,
	ARTIST_MARKED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.MARKED}`,
	ARTIST_MULTILINE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.MULTILINE}`,
	ARTIST_CANCELED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.CANCELED}`,
	ARTIST_REPLACEMENT_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.REPLACEMENT}`, // never used
	ARTIST_FIRST_ON_LINE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.FIRST_ON_LINE}`,
	ARTIST_LAST_ON_LINE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_LINE}`,
	ARTIST_LAST_ON_DAY_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.LAST_ON_DAY}`,
	ARTIST_ALIGN_LEFT_CLASS: `${lineupClassBuilder.artist}--${ARTIST_ALIGN.LEFT}Aligned`,
	ARTIST_ALIGN_RIGHT_CLASS: `${lineupClassBuilder.artist}--${ARTIST_ALIGN.RIGHT}Aligned`,
	ARTIST_NEXT_LINE_ARTIST_CLASS: `${lineupClassBuilder.artist}--${ARTIST_KEYS.NEXT_LINE_ARTIST}`,
	ARTIST_MULTIPLE_ARTISTS_CLASS: lineupClassBuilder.multipleArtists,
	ARTIST_MULTIPLE_ARTISTS_ARTIST_CLASS: `${lineupClassBuilder.multipleArtists}__artist`,
	ARTIST_SLICE_CLASS: `${lineupClassBuilder.slice}`,
	ARTIST_SLICE_UP_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.UP}`,
	ARTIST_SLICE_DOWN_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.DOWN}`,
	ARTIST_SLICE_MIDDLE_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.MIDDLE}`,
	ARTIST_SLICE_LOWER_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.LOWER}`,
	ARTIST_SLICE_MULTILINE_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.MULTILINE}`,
	ARTIST_SLICE_NEW_LINE_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.NEW_LINE}`,
	ARTIST_SLICE_EXPANDED_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.EXPANDED}`,
	ARTIST_SLICE_COLLAPSED_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.COLLAPSED}`,
	ARTIST_SLICE_COMPRESSED_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.COMPRESSED}`,
	ARTIST_SLICE_INDENTED_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.INDENTED}`,
	ARTIST_SLICE_PREVIOUS_LINE_CLASS: `${lineupClassBuilder.slice}--${ARTIST_SLICES_STYLES.PREVIOUS_LINE}`,
};

const bgClassBuilder = LAYOUT.BG_VIDEO_ID;
export const BG = {
	VIDEO_CLASS: `${bgClassBuilder}__video`,
};

const iconClassBuilder = 'icon';
export const ICONS = {
	PLUS: `${iconClassBuilder}--plus`,
	CLOSE: `${iconClassBuilder}--close`,
	CLOSE_RECT: `${iconClassBuilder}--close__line`,
};

const linkClassBuilder = 'link';
export const LINK = {
	BASIC_CLASS: linkClassBuilder,
	INVERTED_STYLE_CLASS: `${linkClassBuilder}--inverted`,
	SIZE_XS_CLASS: `${linkClassBuilder}--sizeXS`,
	SIZE_S_CLASS: `${linkClassBuilder}--sizeS`,
	HAS_ICON_CLASS: `${linkClassBuilder}--hasIcon`,
	ICON_CLASS: `${linkClassBuilder}__${iconClassBuilder}`,
};

const svgMaskClassBuilder = 'svgMask';
export const SVG_MASK = {
	MASK_CLASS: svgMaskClassBuilder,
	MASK_BASE_CLASS: `${svgMaskClassBuilder}__base`,
	MASK_BG_CLASS: `${svgMaskClassBuilder}__bg`,
};


const dialogboxClassBuilder = 'dialogbox';
export const DIALOGBOX = {
	BASIC_CLASS: dialogboxClassBuilder,
	STRETCHED_CLASS: `${dialogboxClassBuilder}--stretched`,
	BG_STRETCHED_CLASS: `${dialogboxClassBuilder}--bg-stretched`,
	VISIBLE_CLASS: `${dialogboxClassBuilder}--${globalClassBuilders.visible}`,
	HEADER_CLASS: `${dialogboxClassBuilder}__header`,
	HEADLINE_CLASS: `${dialogboxClassBuilder}__headline`,
	CLOSE_CLASS: `${dialogboxClassBuilder}__close`,
	CONTENT_CLASS: `${dialogboxClassBuilder}__content`,
	INACTIVE_HELPER_CLASS: `${dialogboxClassBuilder}__inactive-helper`,
};
