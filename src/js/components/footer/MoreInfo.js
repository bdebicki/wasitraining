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
		return addElement('p', {
			children: COPYRIGHTS,
			classNames: FOOTER.COPYRIGHTS_CLASS,
		});
	}

	static renderAboutLink() {
		return addElement('a', {
			children: 'about',
			classNames: [
				LINK.BASIC_CLASS,
				LINK.INVERTED_STYLE_CLASS,
				FOOTER.ABOUT_LINK_CLASS,
			],
			href: '#about',
			onClick: MoreInfo.showAboutDetails,
		});
	}

	static render() {
		return addElement('section', {
			children: [
				MoreInfo.renderCopyrights(),
				MoreInfo.renderAboutLink(),
			],
			classNames: FOOTER.ABOUT_SECTION_CLASS,
		});
	}
}
