import LINK from '../../elementHandlers/link';
import FOOTER from './elementHandlers/footer';
import { COOKIES } from '../../enums/content';
import addElement from '../../utils/addElement';

export default class CookiesInfo {
	static getInfoContent() {
		const content = document.createDocumentFragment();

		content.textContent = COOKIES.PT1;
		content.appendChild(CookiesInfo.renderCookiesLnk());
		// textContent parse link to string, innerHtml += clear eventListener from link, append works correct
		content.append(COOKIES.PT2);

		return content;
	}

	static showCookiesDetails(e) {
		e.preventDefault();

		console.log('cookies policy'); // eslint-disable-line no-console
	}

	static renderCookiesLnk() {
		const settings = {
			children: 'here',
			classNames: LINK.BASIC_CLASS,
			href: '#cookies-policy',
			onClick: CookiesInfo.showCookiesDetails,
		};

		return addElement('a', settings);
	}

	static render() {
		const settings = {
			children: CookiesInfo.getInfoContent(),
			classNames: FOOTER.COOKIES_CLASS,
		};

		return addElement('p', settings);
	}
}
