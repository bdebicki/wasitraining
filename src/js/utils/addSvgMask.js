import SVG_MASK from './elementHandlers/svg';

export const svgType = 'http://www.w3.org/2000/svg';

export function addSVGmask({
	maskBgClass,
	maskId,
	maskShape,
	svgClass,
}) {
	const svg = document.createElementNS(svgType, 'svg');
	const defs = document.createElementNS(svgType, 'defs');
	const mask = document.createElementNS(svgType, 'mask');
	const rectMask = document.createElementNS(svgType, 'rect');
	const rectBg = document.createElementNS(svgType, 'rect');

	svg.classList.add(SVG_MASK.MASK_CLASS);
	if (svgClass) {
		svg.classList.add(svgClass);
	}
	mask.id = maskId;
	mask.setAttributeNS(null, 'maskUnits', 'userSpaceOnUse');
	rectMask.classList.add(SVG_MASK.MASK_BASE_CLASS);
	rectBg.classList.add(SVG_MASK.MASK_BG_CLASS);
	if (maskBgClass) {
		rectBg.classList.add(maskBgClass);
	}
	rectBg.setAttributeNS(null, 'mask', `url(#${maskId})`);

	mask.appendChild(rectMask);
	mask.appendChild(maskShape);
	defs.appendChild(mask);
	svg.appendChild(defs);
	svg.appendChild(rectBg);

	return svg;
}

