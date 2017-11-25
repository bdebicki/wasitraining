'use strict';

export function setIcon(shape, classNames) {
	const xmlns = "http://www.w3.org/2000/svg";
	let svg = document.createElementNS(xmlns, 'svg');

	svg.setAttributeNS(null, 'width', `${shape.width}px`);
	svg.setAttributeNS(null, 'height', `${shape.height}px`);
	svg.setAttributeNS(null, 'viewBox', `0 0 ${shape.width} ${shape.height}`);
	svg.classList.add(shape.className);
	svg.appendChild(shape.icon);

	if(classNames && typeof classNames === 'string') {
		svg.classList.add(classNames);
	}
	if(classNames && Array.isArray(classNames)) {
		classNames.map((className) => {
			svg.classList.add(className);
		});
	}

	return svg;
}