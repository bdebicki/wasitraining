'use strict';

import { VIEW_TYPES } from  '../enums/viewTypes';
import { LAYOUT, VIEWS } from  '../enums/elementHandlers';

function getViewType() {
	return document.querySelector('html').dataset.view;
}

export function updateViewType(viewType) {
	document.querySelector('html').dataset.view = viewType;

	if (viewType === VIEW_TYPES.INTRO) {
		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).classList.add(VIEWS.INTRO_CLASS);
	} else {
		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).classList.remove(VIEWS.INTRO_CLASS);
	}
}

export function updateComponentByViewType(el, modifierClass) {
	const viewType = () => getViewType();

	if(viewType() === VIEW_TYPES.INTRO) {
		el.classList.add(modifierClass);
	} else {
		el.classList.remove(modifierClass);
	}
}