'use strict';

import { FOOTER } from '../../enums/elementHandlers';

export class cookiesInfo {
	showCookiesDetails(e) {
		e.preventDefault();

		console.log('cookies policy');
	}

	createCookiesLnk() {
		let link = document.createElement('a');

		link.href = '#cookies-policy';
		link.textContent = 'here';
		link.addEventListener('click', this.showCookiesDetails, null);

		return link;
	}

	render() {
		let cookiesInfo = document.createElement('p');

		cookiesInfo.classList.add(FOOTER.COOKIES_CLASS);
		cookiesInfo.textContent = 'yep. this site use cookies. click ';
		cookiesInfo.appendChild(this.createCookiesLnk());
		cookiesInfo.append(' for more.'); // textContent parse link to string, innerHtml += clear eventListener from link

		return cookiesInfo;
	}
}
