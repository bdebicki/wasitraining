const editionClassBuilders = {
	details: 'editionDetails',
	lineup: 'shortLineup',
	headlines: 'headliners',
};
const EDITION = {
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
	HEADLINERS_DAY_CLASS: `${editionClassBuilders.headlines}--day`,
	LINEUP_LINK_CLASS: `${editionClassBuilders.lineup}__detailsLink`,
};

export { EDITION as default };
