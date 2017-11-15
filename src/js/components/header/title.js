'use strict';

import { TITLE } from '../../enums/content';
import { HEADER } from '../../enums/elementHandlers';
import { VIEW_TYPES } from '../../enums/viewTypes';
import { introView } from '../../views/introView';
import { updateComponentByViewType } from '../../utils/updateView';

export class title {
	updateTitleLocation(el) {
		updateComponentByViewType(el, HEADER.TITLE_HEADER_CLASS);
	}

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

		link.textContent = TITLE;
		title.classList.add(HEADER.TITLE_CLASS);
		title.appendChild(link);
		this.updateTitleLocation(title);

		return title;
	}
}
