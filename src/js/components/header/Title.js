import DATA_URL from '../../enums/data';
import { TITLE } from '../../enums/content';
import HEADER from './elementHandlers/header';
import VIEW_TYPES from '../../enums/viewTypes';
import IntroView from '../../views/IntroView';
import addElement from '../../utils/addElement';
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
					console.log(error); // eslint-disable-line no-console
				});
		}
	}

	static renderTitleLink() {
		return addElement('a', {
			children: TITLE,
			classNames: HEADER.TITLE_LINK_CLASS,
			href: '#home',
			onClick: Title.backToHome,
		});
	}

	static render() {
		const title = addElement('h1', {
			children: Title.renderTitleLink(),
			classNames: HEADER.TITLE_CLASS,
		});

		Title.updateTitleLocation(title);

		return title;
	}
}
