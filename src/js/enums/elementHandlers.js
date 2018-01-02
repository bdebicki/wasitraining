`use strict`;

import { LINEUP_LEVELS, ARTIST_DECORATORS } from './lineup';

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
	FULL_NAME_CLASS: `${editionClassBuilders.details}__fullName`,
	PLACE_CLASS: `${editionClassBuilders.details}__place`,
	YEAR_CLASS: `${editionClassBuilders.details}__year`,
	DATES_CLASS: `${editionClassBuilders.details}__date`,
	LINEUP_CLASS: editionClassBuilders.lineup,
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
	artists: 'lineupArtists'
};
export const LINEUP = {
	SECTION_ID: lineupClassBuilder.section,
	ARTISTS_CLASS: lineupClassBuilder.artists,
	ARTISTS_EDITION_CLASS: `${lineupClassBuilder.artists}--edition`,
	ARTISTS_DAY_CLASS: `${lineupClassBuilder.artists}__day`,
	ARTISTS_LEVEL_CLASS: `${lineupClassBuilder.artists}__lvl`,
	ARTISTS_HEADLINERS_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.HEADLINERS}`,
	ARTISTS_LVL1_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.LVL1}`,
	ARTISTS_LVL2_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.LVL2}`,
	ARTISTS_LVL3_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.LVL3}`,
	ARTISTS_LVL4_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.LVL4}`,
	ARTISTS_OTHERS_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.OTHERS}`,
	ARTISTS_DAILY_HEADLINERS_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.DAILY_HEADLINERS}`,
	ARTISTS_DAILY_LVL1_CLASS: `${lineupClassBuilder.artists}__lvl--${LINEUP_LEVELS.DAILY_LVL1}`,
	ARTIST_CLASS: `${lineupClassBuilder.artists}__artist`,
	ARTIST_PROMOTED_CLASS: `${lineupClassBuilder.artists}__artist--${ARTIST_DECORATORS.PROMOTED}`,
	ARTIST_EXPANDED_CLASS: `${lineupClassBuilder.artists}__artist--${ARTIST_DECORATORS.EXPANDED}`,
	ARTIST_UPPERCASE_CLASS: `${lineupClassBuilder.artists}__artist--${ARTIST_DECORATORS.UPPERCASE}`,
	ARTIST_MARKED_CLASS: `${lineupClassBuilder.artists}__artist--marked`,
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
	VISIBLE_CLASS: `${dialogboxClassBuilder}--${globalClassBuilders.visible}`,
	HEADER_CLASS: `${dialogboxClassBuilder}__header`,
	HEADLINE_CLASS: `${dialogboxClassBuilder}__headline`,
	CLOSE_CLASS: `${dialogboxClassBuilder}__close`,
};
