`use strict`;

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
	detailsItem: 'rainDetailsItem',
};
export const RAIN = {
	SECTION_ID: rainClassBuilders.section,
	INFO_CLASS: rainClassBuilders.info,
	INFO_YES_CLASS: `${rainClassBuilders.info}--yes`,
	YES_MASK_CLASS: `${rainClassBuilders.info}--yes__mask`,
	YES_SHAPE_CLASS: `${rainClassBuilders.info}--yes__maskShape`,
	YES_VIDEO_CLASS: `${rainClassBuilders.info}--yes__video`,
	INFO_NO_CLASS: `${rainClassBuilders.info}--no`,
	NO_MASK_CLASS: `${rainClassBuilders.info}--no__mask`,
	NO_SHAPE_CLASS: `${rainClassBuilders.info}--no__maskShape`,
	NO_VIDEO_CLASS: `${rainClassBuilders.info}--no__video`,
	HEADER_CLASS: rainClassBuilders.header,
	HEADER_HIDDEN_CLASS: `${rainClassBuilders.header}--${globalClassBuilders.hidden}`,
	HEADLINE_CLASS: `${rainClassBuilders.header}__headline`,
	DETAILS_LINK_CLASS: `${rainClassBuilders.details}__link`,
	CLOSE_DETAILS_CLASS: `${rainClassBuilders.details}__close`,
	DETAILS_ID: rainClassBuilders.details,
	DETAILS_HIDDEN_CLASS: `${rainClassBuilders.details}--${globalClassBuilders.hidden}`,
	DETAILS_ITEM_CLASS: rainClassBuilders.detailsItem,
	DETAILS_ITEM_DAY_CLASS: `${rainClassBuilders.detailsItem}__day`,
	DETAILS_ITEM_RAIN_CLASS: `${rainClassBuilders.detailsItem}__rain`,
};

const bgClassBuilder = LAYOUT.BG_VIDEO_ID;
export const BG = {
	VIDEO_CLASS: `${bgClassBuilder}__video`,
};

const iconClassBuilder = 'icon';
export const ICONS = {
	PLUS: `${iconClassBuilder}--plus`,
};

const linkClassBuilder = 'link';
export const LINK = {
	BASIC_CLASS: linkClassBuilder,
	INVERTED_STYLE_CLASS: `${linkClassBuilder}--inverted`,
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
