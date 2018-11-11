import LINK from '../../elementHandlers/link';
import FOOTER from './elementHandlers/footer';
import { COPYRIGHTS } from '../../enums/content';

export default class MoreInfo {
	static showAboutDetails(e) {
		e.preventDefault();

		console.log('about dialogbox'); // eslint-disable-line no-console
	}

	static renderCopyrights() {
		const copyrights = document.createElement('p');

		copyrights.classList.add(FOOTER.COPYRIGHTS_CLASS);
		copyrights.textContent = COPYRIGHTS;

		return copyrights;
	}

	static renderAboutLink() {
		const link = document.createElement('a');

		link.textContent = 'about';
		link.href = '#about';
		link.classList.add(LINK.BASIC_CLASS, LINK.INVERTED_STYLE_CLASS, FOOTER.ABOUT_LINK_CLASS);
		link.addEventListener('click', MoreInfo.showAboutDetails, null);

		return link;
	}

	static render() {
		const moreInfoContainer = document.createElement('section');

		moreInfoContainer.classList.add(FOOTER.ABOUT_SECTION_CLASS);
		moreInfoContainer.appendChild(MoreInfo.renderCopyrights());
		moreInfoContainer.appendChild(MoreInfo.renderAboutLink());

		return moreInfoContainer;
	}
}
