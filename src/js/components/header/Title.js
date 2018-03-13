import DATA_URL from '../../enums/data';
import { TITLE } from '../../enums/content';
import { HEADER } from '../../enums/elementHandlers';
import VIEW_TYPES from '../../enums/viewTypes';
import IntroView from '../../views/IntroView';
import { updateComponentByViewType } from '../../utils/updateView';

export default class Title {
	updateTitleLocation(el) {
		updateComponentByViewType(el, HEADER.TITLE_HEADER_CLASS);
	}

	backToHome(e) {
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

	renderTitleLink() {
		const a = document.createElement('a');

		a.href = '#home';
		a.classList.add(HEADER.TITLE_LINK_CLASS);
		a.addEventListener('click', this.backToHome, null);

		return a;
	}

	render() {
		const title = document.createElement('h1');
		const link = this.renderTitleLink();

		link.textContent = TITLE;
		title.classList.add(HEADER.TITLE_CLASS);
		title.appendChild(link);
		this.updateTitleLocation(title);

		return title;
	}
}
