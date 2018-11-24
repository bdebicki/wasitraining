import { TITLE } from '../../enums/content';
import HEADER from './elementHandlers/header';
import LAYOUT from '../../elementHandlers/layout';
import addElement from '../../utils/addElement';
import { updateComponentByViewType } from '../../utils/updateView';
import Title from './Title';

export default class Header {
	static updateHeaderLocation(el) {
		updateComponentByViewType(el, HEADER.INTRO_HEADER_CLASS);
	}

	static renderHeaderContainer() {
		const headerContainer = addElement('header', {
			id: LAYOUT.HEADER_ID,
			dataAttr: { bgText: TITLE },
		});

		Header.updateHeaderLocation(headerContainer);

		return headerContainer;
	}

	static render() {
		const headerContainer = Header.renderHeaderContainer();

		headerContainer.appendChild(Title.render());

		return headerContainer;
	}
}
