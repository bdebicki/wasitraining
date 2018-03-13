import { TITLE } from '../../enums/content';
import { LAYOUT, HEADER } from '../../enums/elementHandlers';
import { updateComponentByViewType } from '../../utils/updateView';
import Title from './Title';

export default class Header {
	constructor(data, target) {
		this.data = data;
		this.target = target;
	}

	updateHeaderLocation(el) {
		updateComponentByViewType(el, HEADER.INTRO_HEADER_CLASS);
	}

	renderHeaderContainer() {
		const headerContainer = document.createElement('header');

		headerContainer.id = LAYOUT.HEADER_ID;
		headerContainer.dataset.bgText = TITLE;
		this.updateHeaderLocation(headerContainer);

		return headerContainer;
	}

	render() {
		const pageTitle = new Title();
		const headerContainer = this.renderHeaderContainer();

		headerContainer.appendChild(pageTitle.render());

		document.getElementById(this.target).appendChild(headerContainer);
	}
}
