'use strict';

import { TITLE } from '../../enums/content';
import { LAYOUT, HEADER } from '../../enums/elementHandlers';

export class title {
	render() {
		let title = document.createElement('h1');
		title.classList.add(HEADER.TITLE_CLASS);
		title.textContent = TITLE;

		return title;
	}
}
