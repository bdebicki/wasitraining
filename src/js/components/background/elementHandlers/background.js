import LAYOUT from '../../../elementHandlers/layout';

const bgClassBuilders = {
	cover: LAYOUT.BG_COVER_ID,
	video: LAYOUT.BG_VIDEO_ID,
};
const BG = {
	COVER_CLASS: `${bgClassBuilders.cover}__cover`,
	VIDEO_CLASS: `${bgClassBuilders.video}__video`,
};

export { BG as default };
