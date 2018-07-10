import globalClassBuilders from './globalClassBuilders';

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
