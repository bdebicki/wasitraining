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
	EDITIONS_CLASS: 'editionsList',
	EDITION_CLASS: 'edition',
	EDITION_LINK_CLASS: 'edition__link',
	EDITION_YEAR_CLASS: 'edition__year',
	EDITION_MASK_CLASS: 'edition__mask',
	EDITION_MASK_RECT_CLASS: 'mask__rect',
	EDITION_MASK_TEXT_CLASS: 'mask__text',
	EDITION_MASK_BG_CLASS: 'mask__bg',

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
export const ACTIVE_CLASS = 'active';
export const VISIBILITY_CLASS = 'visible';
export const SELECTED_CLASS = 'selected';