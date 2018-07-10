import globalClassBuilders from './globalClassBuilders';
import LAYOUT from './layout';

const timelineClassBuilders = {
	mainTimelineItem: `${LAYOUT.MAIN_TIMELINE_ID}Item`,
	mainTimelineItemMask: `${LAYOUT.MAIN_TIMELINE_ID}ItemMask`,
	navTimelineItem: `${LAYOUT.NAV_TIMELINE_ID}Item`,
	navTimelineItemMask: `${LAYOUT.NAV_TIMELINE_ID}ItemMask`,
	link: 'link',
};
const TIMELINE = {
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
	NAV_EDITION_ACTIVE_CLASS: `${timelineClassBuilders.navTimelineItem}__${timelineClassBuilders.link}--${globalClassBuilders.active}`, // eslint-disable-line max-len
};

export { TIMELINE as default };
