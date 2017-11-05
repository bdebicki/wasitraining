'use strict';

import { VIEW_TYPES } from  '../enums/viewTypes';
import { LAYOUT, VIEWS } from  '../enums/elementHandlers';

export function updateViewType(viewType) {
	document.querySelector('html').dataset.view = viewType;

	if (viewType === VIEW_TYPES.INTRO) {
		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).classList.add(VIEWS.INTRO_CLASS);
	} else {
		document.getElementById(LAYOUT.MAIN_CONTAINER_ID).classList.remove(VIEWS.INTRO_CLASS);
	}
}
export function getViewType() {
	return document.querySelector('html').dataset.view;
}