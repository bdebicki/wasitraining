'use strict';

import { FOOTER, LINK } from '../../enums/elementHandlers';
import { COOKIES } from '../../enums/content';

export class cookiesInfo {
	showCookiesDetails(e) {
		e.preventDefault();

		console.log('cookies policy');
	}

	renderCookiesLnk() {
		let link = document.createElement('a');

		link.textContent = 'here';
		link.href = '#cookies-policy';
		link.classList.add(LINK.BASIC_CLASS);
		link.addEventListener('click', this.showCookiesDetails, null);

		return link;
	}

	render() {
		let cookiesInfo = document.createElement('p');

		cookiesInfo.textContent = COOKIES.PT1;
		cookiesInfo.classList.add(FOOTER.COOKIES_CLASS);
		cookiesInfo.appendChild(this.renderCookiesLnk());
		cookiesInfo.append(COOKIES.PT2); // textContent parse link to string, innerHtml += clear eventListener from link

		return cookiesInfo;
	}
}
