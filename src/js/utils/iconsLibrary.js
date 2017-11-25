'use strict';

import { ICONS } from '../enums/elementHandlers';

const xmlns = "http://www.w3.org/2000/svg";

export const icons = {
	plus: () => {
		let icon = document.createDocumentFragment();
		const rectH = document.createElementNS(xmlns, 'rect');
		const rectV = document.createElementNS(xmlns, 'rect');
		const width = 5;
		const height = 5;
		const className = ICONS.PLUS;

		rectH.setAttributeNS(null, 'x', '0');
		rectH.setAttributeNS(null, 'y', '2');
		rectH.setAttributeNS(null, 'width', '5');
		rectH.setAttributeNS(null, 'height', '1');
		rectV.setAttributeNS(null, 'x', '2');
		rectV.setAttributeNS(null, 'y', '0');
		rectV.setAttributeNS(null, 'width', '1');
		rectV.setAttributeNS(null, 'height', '5');

		icon.appendChild(rectH);
		icon.appendChild(rectV);

		return {icon, width, height, className};
	},

	close: () => {
		let icon = document.createDocumentFragment();
		const rectH = document.createElementNS(xmlns, 'rect');
		const rectV = document.createElementNS(xmlns, 'rect');
		const width = 10;
		const height = 10;
		const className = ICONS.CLOSE;

		rectH.classList.add(ICONS.CLOSE_RECT);
		rectH.setAttributeNS(null, 'x', '-1');
		rectH.setAttributeNS(null, 'y', '4');
		rectH.setAttributeNS(null, 'width', '12');
		rectH.setAttributeNS(null, 'height', '2');
		rectV.classList.add(ICONS.CLOSE_RECT);
		rectV.setAttributeNS(null, 'x', '4');
		rectV.setAttributeNS(null, 'y', '-1');
		rectV.setAttributeNS(null, 'width', '2');
		rectV.setAttributeNS(null, 'height', '12');

		icon.appendChild(rectH);
		icon.appendChild(rectV);

		return {icon, width, height, className};
	}
};
