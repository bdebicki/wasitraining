'use strict';

import { TITLE } from '../../enums/content';
import { LAYOUT, HEADER } from '../../enums/elementHandlers';
import { VIEW_TYPES } from '../../enums/viewTypes';
import { updateViewType } from '../../utils/updateView';

export class title {
	backToHome(e) {
		e.preventDefault();

		if(document.querySelector('html').dataset.view === VIEW_TYPES.YEAR) {
			updateViewType(VIEW_TYPES.INTRO);
			document.getElementById(LAYOUT.MAIN_CONTAINER_ID).appendChild(document.getElementById(LAYOUT.TIMELINE_ID));
			document.getElementById(LAYOUT.YEAR_CONTAINER_ID).remove();
		}
	}

	renderTitleLink() {
		let a = document.createElement('a');

		a.href = '#home';
		a.addEventListener('click', this.backToHome, null);

		return a;
	}

	render() {
		let title = document.createElement('h1');
		let link = this.renderTitleLink();

		title.classList.add(HEADER.TITLE_CLASS);
		title.appendChild(link);
		link.textContent = TITLE;

		return title;
	}
}
