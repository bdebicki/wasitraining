'use strict';

export function updateView(viewType) {
	document.querySelector('html').dataset.view = viewType;
}