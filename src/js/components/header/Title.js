import DATA_URL from '../../enums/data';
import { TITLE } from '../../enums/content';
import { HEADER } from '../../enums/elementHandlers';
import VIEW_TYPES from '../../enums/viewTypes';
import IntroView from '../../views/IntroView';
import { updateComponentByViewType } from '../../utils/updateView';

export default class Title {
	static updateTitleLocation(el) {
		updateComponentByViewType(el, HEADER.TITLE_HEADER_CLASS);
	}

	static backToHome(e) {
		e.preventDefault();

		if (document.querySelector('html').dataset.view === VIEW_TYPES.YEAR) {
			fetch(DATA_URL)
				.then((response) => response.json())
				.then((data) => {
					const intro = new IntroView(data);
					intro.switchToIntoView();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	static renderTitleLink() {
		const a = document.createElement('a');

		a.href = '#home';
		a.classList.add(HEADER.TITLE_LINK_CLASS);
		a.addEventListener('click', Title.backToHome, null);

		return a;
	}

	static render() {
		const title = document.createElement('h1');
		const link = Title.renderTitleLink();

		link.textContent = TITLE;
		title.classList.add(HEADER.TITLE_CLASS);
		title.appendChild(link);
		Title.updateTitleLocation(title);

		return title;
	}
}
