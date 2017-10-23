'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { header } from '../components/header/header';
import { yearDetails } from '../components/yearDetails/yearDetails'
import { footer } from '../components/footer/footer';

export class yearView {
	constructor(data) {
		this.data = data
	}

	render() {
		const body = LAYOUT.MAIN_CONTAINER_ID;
		const activeEdition = Object.keys(this.data).length;
		const headerBlock = new header(this.data, activeEdition, body);
		const yearBlock = new yearDetails(this.data[activeEdition], body);
		const footerBlock = new footer(body);

		headerBlock.render();
		yearBlock.render();
		footerBlock.render();
	}
}