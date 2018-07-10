import { TITLE } from '../../enums/content';
import HEADER from '../../elementHandlers/header';
import LAYOUT from '../../elementHandlers/layout';
import { updateComponentByViewType } from '../../utils/updateView';
import Title from './Title';

export default class Header {
	constructor(data, target) {
		this.data = data;
		this.target = target;
	}

	static updateHeaderLocation(el) {
		updateComponentByViewType(el, HEADER.INTRO_HEADER_CLASS);
	}

	static renderHeaderContainer() {
		const headerContainer = document.createElement('header');

		headerContainer.id = LAYOUT.HEADER_ID;
		headerContainer.dataset.bgText = TITLE;
		Header.updateHeaderLocation(headerContainer);

		return headerContainer;
	}

	render() {
		const headerContainer = Header.renderHeaderContainer();

		headerContainer.appendChild(Title.render());

		document.getElementById(this.target).appendChild(headerContainer);
	}
}
