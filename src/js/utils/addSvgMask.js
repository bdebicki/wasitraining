import addSvgElement from './addSvgElement';
import SVG_MASK from './elementHandlers/svg';

export default function({
	maskId,
	maskShape,
}) {
	const rectMaskSettings = {
		classNames: SVG_MASK.MASK_BASE_CLASS,
		properties: [
			{ width: '100%' },
			{ height: '100%' },
		],
	};
	const maskSettings = {
		children: [
			addSvgElement('rect', rectMaskSettings),
			maskShape,
		],
		id: maskId,
		properties: { maskUnits: 'userSpaceOnUse' },
	};

	return addSvgElement('mask', maskSettings);
}
