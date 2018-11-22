import addSvgElement from './addSvgElement';

export default function setIcon(shape, classNames) {
	return addSvgElement('svg', {
		children: shape.icon,
		classNames: [shape.className].concat(classNames),
		properties: [
			{ width: `${shape.width}px` },
			{ height: `${shape.height}px` },
			{ viewBox: `0 0 ${shape.width} ${shape.height}` },
		],
	});
}
