import { FOOTER, LINK } from '../../enums/elementHandlers';
import { COPYRIGHTS } from '../../enums/content';

export default class MoreInfo {
	showAboutDetails(e) {
		e.preventDefault();

		console.log('about dialogbox');
	}

	renderCopyrights() {
		const copyrights = document.createElement('p');

		copyrights.classList.add(FOOTER.COPYRIGHTS_CLASS);
		copyrights.textContent = COPYRIGHTS;

		return copyrights;
	}

	renderAboutLink() {
		const link = document.createElement('a');

		link.textContent = 'about';
		link.href = '#about';
		link.classList.add(LINK.BASIC_CLASS, LINK.INVERTED_STYLE_CLASS, FOOTER.ABOUT_LINK_CLASS);
		link.addEventListener('click', this.showAboutDetails, null);

		return link;
	}

	render() {
		const moreInfoContainer = document.createElement('section');

		moreInfoContainer.classList.add(FOOTER.ABOUT_SECTION_CLASS);
		moreInfoContainer.appendChild(this.renderCopyrights());
		moreInfoContainer.appendChild(this.renderAboutLink());

		return moreInfoContainer;
	}
}
