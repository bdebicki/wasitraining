`use strict`;

import {LINEUP_LEVELS, ARTIST_DECORATORS, ARTIST_SLICES_STYLES, ARTIST_KEYS, ARTIST_ALIGN} from './lineup';

export const globalClassBuilders = {
	active: 'isActive',
	visible: 'isVisible',
	hidden: 'isHidden'
};

export const LAYOUT = {
	MAIN_CONTAINER_ID: 'wiraof',
	HEADER_ID: 'header',
	MAIN_TIMELINE_ID: 'mainTimeline',
	NAV_TIMELINE_ID: 'navTimeline',
	YEAR_CONTAINER_ID: 'yearDetails',
	BG_VIDEO_ID: 'bgVideo',
	FOOTER_ID: 'footer',
};

export const VIEWS = {
	INTRO_CLASS: `${LAYOUT.MAIN_CONTAINER_ID}--introView`
};

const headerClassBuilders = {
	main: LAYOUT.HEADER_ID,
	title: 'pageName',
};
export const HEADER = {
	INTRO_HEADER_CLASS: `${headerClassBuilders.main}--introHeader`,
	TITLE_CLASS: headerClassBuilders.title,
	TITLE_HEADER_CLASS: `${headerClassBuilders.title}--introHeader`,
	TITLE_LINK_CLASS: `${headerClassBuilders.title}__link`,
};

const aboutClassBuilder = 'aboutSection';
export const FOOTER = {
	COOKIES_CLASS: `cookiesSection`,
	ABOUT_SECTION_CLASS: aboutClassBuilder,
	COPYRIGHTS_CLASS: `${aboutClassBuilder}__copyrights`,
	ABOUT_LINK_CLASS: `${aboutClassBuilder}__aboutLink`,
};

const timelineClassBuilders = {
	mainTimelineItem: `${LAYOUT.MAIN_TIMELINE_ID}Item`,
	mainTimelineItemMask: `${LAYOUT.MAIN_TIMELINE_ID}ItemMask`,
	navTimelineItem: `${LAYOUT.NAV_TIMELINE_ID}Item`,
	navTimelineItemMask: `${LAYOUT.NAV_TIMELINE_ID}ItemMask`,
	link: 'link',
};
export const TIMELINE = {
	MAIN_EDITIONS_CLASS: `${timelineClassBuilders.mainTimelineItem}List`,
	MAIN_EDITION_CLASS: timelineClassBuilders.mainTimelineItem,
	MAIN_EDITION_LINK_CLASS: `${timelineClassBuilders.mainTimelineItem}__${timelineClassBuilders.link}`,
	MAIN_EDITION_YEAR_CLASS: `${timelineClassBuilders.mainTimelineItem}__year`,
	MAIN_EDITION_MASK_CLASS: timelineClassBuilders.mainTimelineItemMask,
	MAIN_EDITION_MASK_TEXT_CLASS: `${timelineClassBuilders.mainTimelineItemMask}__text`,
	MAIN_EDITION_MASK_BG_CLASS: `${timelineClassBuilders.mainTimelineItemMask}__bg`,
	NAV_EDITIONS_CLASS: `${timelineClassBuilders.navTimelineItem}List`,
	NAV_EDITION_CLASS: timelineClassBuilders.navTimelineItem,
	NAV_EDITION_LINK_CLASS: `${timelineClassBuilders.navTimelineItem}__${timelineClassBuilders.link}`,
	NAV_EDITION_ACTIVE_CLASS: `${timelineClassBuilders.navTimelineItem}__${timelineClassBuilders.link}--${globalClassBuilders.active}`,
};

const editionClassBuilders = {
	details: 'editionDetails',
	lineup: 'shortLineup',
	headlines: 'headliners',
};
export const EDITION = {
	EDITION_DETAILS_ID: editionClassBuilders.details,
	EDITION_DETAILS_YEAR_CLASS: `${editionClassBuilders.details}--edition`,
	FULL_NAME_CLASS: `${editionClassBuilders.details}__fullName`,
	PLACE_CLASS: `${editionClassBuilders.details}__place`,
	YEAR_CLASS: `${editionClassBuilders.details}__year`,
	DATES_CLASS: `${editionClassBuilders.details}__date`,
	LINEUP_CLASS: editionClassBuilders.lineup,
	LINEUP_EDITION_CLASS: `${editionClassBuilders.lineup}--edition`,
	HEADLINERS_CLASS: `${editionClassBuilders.lineup}__${editionClassBuilders.headlines}`,
	HEADLINER_CLASS: `${editionClassBuilders.headlines}__headliner`,
	LINEUP_LINK_CLASS: `${editionClassBuilders.lineup}__detailsLink`,
};

const rainClassBuilders = {
	section: 'rainSection',
	info: 'rainInfo',
	header: 'rainHeader',
	details: 'rainDetails',
	detailsList: 'rainDetailsList',
};
export const RAIN = {
	SECTION_ID: rainClassBuilders.section,
	INFO_CLASS: rainClassBuilders.info,
	INFO_YES_CLASS: `${rainClassBuilders.info}--yes`,
	INFO_NO_CLASS: `${rainClassBuilders.info}--no`,
	MASK_CLASS: `${rainClassBuilders.info}__mask`,
	YES_SHAPE_CLASS: `${rainClassBuilders.info}__maskShape--yes`,
	NO_SHAPE_CLASS: `${rainClassBuilders.info}__maskShape--no`,
	VIDEO_CLASS: `${rainClassBuilders.info}__video`,
	YES_VIDEO_CLASS: `${rainClassBuilders.info}__video--yes`,
	NO_VIDEO_CLASS: `${rainClassBuilders.info}__video--no`,
	HEADER_CLASS: rainClassBuilders.header,
	HEADER_HIDDEN_CLASS: `${rainClassBuilders.header}--${globalClassBuilders.hidden}`,
	HEADLINE_CLASS: `${rainClassBuilders.header}__headline`,
	DETAILS_LINK_CLASS: `${rainClassBuilders.details}__link`,
	CLOSE_DETAILS_CLASS: `${rainClassBuilders.details}__close`,
	DETAILS_ID: rainClassBuilders.details,
	DETAILS_CLASS: rainClassBuilders.details,
	DETAILS_LIST_CLASS: rainClassBuilders.detailsList,
	DETAILS_ITEM_CLASS: `${rainClassBuilders.detailsList}__item`,
	DETAILS_ITEM_DAY_CLASS: `${rainClassBuilders.detailsList}__day`,
	DETAILS_ITEM_RAIN_CLASS: `${rainClassBuilders.detailsList}__rain`,
};

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
	ARTISTS_LINE_CLASS: lineupClassBuilder.line,
	ARTISTS_LEVEL_CLASS: lineupClassBuilder.lvl,
	ARTISTS_HEADLINERS_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.HEADLINERS}`,
	ARTISTS_LVL1_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL1}`,
	ARTISTS_LVL2_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL2}`,
	ARTISTS_LVL3_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL3}`,
	ARTISTS_LVL4_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.LVL4}`,
	ARTISTS_OTHERS_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.OTHERS}`,
	ARTISTS_DAILY_CLASS: `${lineupClassBuilder.lvl}--${LINEUP_LEVELS.DAILY_ARTISTS}`,
	ARTIST_CLASS: `${lineupClassBuilder.artist}`,
	ARTIST_PROMOTED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.PROMOTED}`,
	ARTIST_EXPANDED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.EXPANDED}`,
	ARTIST_COLLAPSED_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.COLLAPSED}`,
	ARTIST_UPPERCASE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.UPPERCASE}`,
	ARTIST_CAPITALIZE_CLASS: `${lineupClassBuilder.artist}--${ARTIST_DECORATORS.CAPITALIZE}`,
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
