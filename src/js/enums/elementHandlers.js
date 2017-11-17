'use strict';

export const LAYOUT = {
	MAIN_CONTAINER_ID: 'wiraof',
	HEADER_ID: 'header',
	MAIN_TIMELINE_ID: 'mainTimeline',
	NAV_TIMELINE_ID: 'navTimeline',
	YEAR_CONTAINER_ID: 'yearDetails',
	BG_VIDEO_ID: 'bgVideo',
	FOOTER_ID: 'footer'
};
export const VIEWS = {
	INTRO_CLASS: `${LAYOUT.MAIN_CONTAINER_ID}--introView`
};
export const HEADER = {
	INTRO_HEADER_CLASS: `${LAYOUT.HEADER_ID}--introHeader`,
	TITLE_CLASS: 'pageName',
	TITLE_HEADER_CLASS: 'pageName--introHeader',
	TITLE_LINK_CLASS: 'pageName__link'
};
export const FOOTER = {
	COOKIES_CLASS: 'cookiesSection',
	ABOUT_SECTION_CLASS: 'aboutSection',
	COPYRIGHTS_CLASS: 'aboutSection__copyrights',
	ABOUT_LINK_CLASS: 'aboutSection__aboutLink'
};
export const TIMELINE = {
	MAIN_EDITIONS_CLASS: 'mainEditionsList',
	MAIN_EDITION_CLASS: 'mainEdition',
	MAIN_EDITION_LINK_CLASS: 'mainEdition__link',
	MAIN_EDITION_YEAR_CLASS: 'mainEdition__year',
	MAIN_EDITION_MASK_CLASS: 'mainEdition__mask',
	MAIN_EDITION_MASK_RECT_CLASS: 'mainEditionMask__rect',
	MAIN_EDITION_MASK_TEXT_CLASS: 'mainEditionMask__text',
	MAIN_EDITION_MASK_BG_CLASS: 'mainEditionMask__bg',
	NAV_EDITIONS_CLASS: 'navEditionsList',
	NAV_EDITION_CLASS: 'navEdition',
	NAV_EDITION_LINK_CLASS: 'navEdition__link',
	NAV_EDITION_ACTIVE_CLASS: 'navEdition__link--active',
};
export const EDITION = {
	EDITION_DETAILS_ID: 'editionDetails',
	FULL_NAME_CLASS: 'fullName',
	PLACE_CLASS: 'place',
	YEAR_CLASS: 'editionYear',
	DATES_CLASS: 'date',
	HEADLINERS_CLASS: 'headliners',
	LINEUP_LINK_CLASS: 'lineupDetailsLink'
};
export const RAIN = {
	RAIN_DETAILS_ID: 'rainDetails',
	RAIN_CLASS: 'rain',
	DETAILS_LINK_CLASS: 'rainDetailsLink',
	EDITION_RAIN_DETAILS_ID: 'rainEditionDetails'
};
export const VIDEO = {
	VIDEO_CLASS: `${LAYOUT.BG_VIDEO_ID}__video`
};
export const LINK = {
	BASIC_CLASS: 'link',
	INVERTED_STYLE_CLASS: 'link--inverted'
};
export const VISIBILITY_CLASS = 'visible';
export const SELECTED_CLASS = 'selected';