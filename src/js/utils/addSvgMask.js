import addSvgElement from './addSvgElement';
import SVG_MASK from './elementHandlers/svg';

export default function({
	maskBgClass,
	maskId,
	maskShape,
	svgClass,
}) {
	const rectMaskSettings = {
		classNames: SVG_MASK.MASK_BASE_CLASS,
	};
	const bgSettings = {
		classNames: [
			SVG_MASK.MASK_BG_CLASS,
			maskBgClass,
		],
		properties: { mask: `url(#${maskId})` },
	};
	const maskSettings = {
		children: [
			addSvgElement('rect', rectMaskSettings),
			maskShape,
		],
		id: maskId,
		properties: { maskUnits: 'userSpaceOnUse' },
	};
	const defsSettings = {
		children: addSvgElement('mask', maskSettings),
	};
	const svgSettings = {
		children: [
			addSvgElement('defs', defsSettings),
			addSvgElement('rect', bgSettings),
		],
		classNames: [
			SVG_MASK.MASK_CLASS,
			svgClass,
		],
	};

	// return addSvgElement('svg', svgSettings);
	return addSvgElement('mask', maskSettings);
}
