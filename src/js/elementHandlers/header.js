import LAYOUT from './layout';

const headerClassBuilders = {
	main: LAYOUT.HEADER_ID,
	title: 'pageName',
};
const HEADER = {
	INTRO_HEADER_CLASS: `${headerClassBuilders.main}--introHeader`,
	TITLE_CLASS: headerClassBuilders.title,
	TITLE_HEADER_CLASS: `${headerClassBuilders.title}--introHeader`,
	TITLE_LINK_CLASS: `${headerClassBuilders.title}__link`,
};

export { HEADER as default };
