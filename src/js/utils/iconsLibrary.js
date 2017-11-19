'use strict';

import { ICONS } from '../enums/elementHandlers';

export const icons = {
	plus: () => {
		let icon = document.createDocumentFragment();
		const xmlns = "http://www.w3.org/2000/svg";
		const rectH = document.createElementNS(xmlns, 'rect');
		const rectV = document.createElementNS(xmlns, 'rect');
		const width = 5;
		const height = 5;
		const className = ICONS.PLUS;

		rectH.setAttributeNS(null, 'y', '2');
		rectH.setAttributeNS(null, 'width', '5');
		rectH.setAttributeNS(null, 'height', '1');
		rectV.setAttributeNS(null, 'x', '2');
		rectV.setAttributeNS(null, 'width', '1');
		rectV.setAttributeNS(null, 'height', '5');

		icon.appendChild(rectH);
		icon.appendChild(rectV);

		return {icon, width, height, className};
	}
};
