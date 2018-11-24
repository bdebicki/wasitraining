import LINK from '../../elementHandlers/link';
import FOOTER from './elementHandlers/footer';
import { COPYRIGHTS } from '../../enums/content';
import addElement from '../../utils/addElement';

export default class MoreInfo {
	static showAboutDetails(e) {
		e.preventDefault();

		console.log('about dialogbox'); // eslint-disable-line no-console
	}

	static renderCopyrights() {
		const settings = {
			children: COPYRIGHTS,
			classNames: FOOTER.COPYRIGHTS_CLASS,
		};

		return addElement('p', settings);
	}

	static renderAboutLink() {
		const settings = {
			children: 'about',
			classNames: [
				LINK.BASIC_CLASS,
				LINK.INVERTED_STYLE_CLASS,
				FOOTER.ABOUT_LINK_CLASS,
			],
			href: '#about',
			onClick: MoreInfo.showAboutDetails,
		};

		return addElement('a', settings);
	}

	static render() {
		const settings = {
			children: [
				MoreInfo.renderCopyrights(),
				MoreInfo.renderAboutLink(),
			],
			classNames: FOOTER.ABOUT_SECTION_CLASS,
		};

		return addElement('section', settings);
	}
}
