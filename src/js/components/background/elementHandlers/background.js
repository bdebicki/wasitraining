import LAYOUT from '../../../elementHandlers/layout';

const bgClassBuilders = {
	cover: LAYOUT.BG_COVER_ID,
	video: LAYOUT.BG_VIDEO_ID,
};
const BG = {
	COVER_CLASS: `${bgClassBuilders.cover}__cover`,
	COVER_SHAPE_CLASS: `${bgClassBuilders.cover}__coverShape`,
	MASK_SHAPE: `${bgClassBuilders.cover}__maskShape`,
	MASK_SHAPE_YES: `${bgClassBuilders.cover}__maskShape--yes`,
	MASK_SHAPE_NO: `${bgClassBuilders.cover}__maskShape--no`,
	VIDEO_CLASS: `${bgClassBuilders.video}__video`,
};

export { BG as default };
