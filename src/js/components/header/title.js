'use strict';

import { TITLE } from '../../enums/content';
import { HEADER } from '../../enums/elementHandlers';
import { VIEW_TYPES } from '../../enums/viewTypes';
import { introView } from '../../views/introView';

export class title {
	backToHome(e) {
		e.preventDefault();

		if(document.querySelector('html').dataset.view === VIEW_TYPES.YEAR) {
			const intro = new introView();
			intro.switchToIntoView();
		}
	}

	renderTitleLink() {
		let a = document.createElement('a');

		a.href = '#home';
		a.classList.add(HEADER.TITLE_LINK_CLASS);
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
