'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { header } from '../components/header/header';
import { footer } from '../components/footer/footer';
import { renderEditionDetails } from '../actions/renderEditionDetails';

export class yearView {
	constructor(data) {
		this.data = data
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const activeEdition = Object.keys(this.data).length;
		const headerBlock = new header(this.data, activeEdition);
		const footerBlock = new footer(body);

		headerBlock.render();
		footerBlock.render();

		renderEditionDetails(this.data[activeEdition]);
	}
}