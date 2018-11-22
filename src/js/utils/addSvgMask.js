import addSvgElement from './addSvgElement';
import SVG_MASK from './elementHandlers/svg';

export const svgType = 'http://www.w3.org/2000/svg';

export function addSVGmask({
	maskBgClass,
	maskId,
	maskShape,
	svgClass,
}) {
	const rectMask = addSvgElement('rect', { classNames: SVG_MASK.MASK_BASE_CLASS });
	const rectBg = addSvgElement('rect', {
		classNames: [
			SVG_MASK.MASK_BG_CLASS,
			maskBgClass,
		],
		properties: { mask: `url(#${maskId})` },
	});
	const mask = addSvgElement('mask', {
		children: [
			rectMask,
			maskShape,
		],
		id: maskId,
		properties: { maskUnits: 'userSpaceOnUse' },
	});
	const defs = addSvgElement('defs', { children: mask });

	return addSvgElement('svg', {
		children: [
			defs,
			rectBg,
		],
		classNames: [
			SVG_MASK.MASK_CLASS,
			svgClass,
		],
	});
}
