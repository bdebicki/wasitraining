import { FOOTER, LINK } from '../../enums/elementHandlers';
import { COOKIES } from '../../enums/content';

export default class CookiesInfo {
	showCookiesDetails(e) {
		e.preventDefault();

		console.log('cookies policy');
	}

	renderCookiesLnk() {
		const link = document.createElement('a');

		link.textContent = 'here';
		link.href = '#cookies-policy';
		link.classList.add(LINK.BASIC_CLASS);
		link.addEventListener('click', this.showCookiesDetails, null);

		return link;
	}

	render() {
		const cookiesInfoContainer = document.createElement('p');

		cookiesInfoContainer.textContent = COOKIES.PT1;
		cookiesInfoContainer.classList.add(FOOTER.COOKIES_CLASS);
		cookiesInfoContainer.appendChild(this.renderCookiesLnk());
		// textContent parse link to string, innerHtml += clear eventListener from link, append works correct
		cookiesInfoContainer.append(COOKIES.PT2);

		return cookiesInfoContainer;
	}
}
