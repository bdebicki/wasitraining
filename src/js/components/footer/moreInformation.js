'use strict';

import { FOOTER, LINK } from '../../enums/elementHandlers';
import { COPYRIGHTS } from '../../enums/content';

export class moreInfo {
	showAboutDetails(e) {
		e.preventDefault();

		console.log('about dialogbox');
	}

	renderCopyrights() {
		let copyrights = document.createElement('p');

		copyrights.classList.add(FOOTER.COPYRIGHTS_CLASS);
		copyrights.textContent = COPYRIGHTS;

		return copyrights;
	}

	renderAboutLink() {
		let link = document.createElement('a');

		link.textContent = 'about';
		link.href = '#about';
		link.classList.add(LINK.BASIC_CLASS, LINK.INVERTED_STYLE_CLASS);
		link.addEventListener('click', this.showAboutDetails, null);

		return link;
	}

	render() {
		let moreInfoContainer = document.createElement('section');

		moreInfoContainer.classList.add(FOOTER.ABOUT_SECTION_CLASS);
		moreInfoContainer.appendChild(this.renderCopyrights());
		moreInfoContainer.appendChild(this.renderAboutLink());

		return moreInfoContainer;
	}
}