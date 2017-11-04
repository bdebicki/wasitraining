'use strict';

import { VIEW_TYPES } from  '../enums/viewTypes';
import { VIEWS } from  '../enums/elementHandlers';

export function updateViewType(viewType) {
	const htmlEl = document.querySelector('html');

	htmlEl.dataset.view = viewType;
	if (viewType === VIEW_TYPES.INTRO) {
		htmlEl.id = VIEWS.INTRO_ID;
	} else {
		htmlEl.id = '';
	}
}
export function getViewType() {
	return document.querySelector('html').dataset.view;
}