'use strict';

export function updateViewType(viewType) {
	document.querySelector('html').dataset.view = viewType;
}
export function getViewType() {
	return document.querySelector('html').dataset.view;
}