'use strict';

import { lineup } from "../../classes/lineup";
import { LINEUP } from "../../enums/elementHandlers";
import { addDialogbox } from '../../utils/addDialogbox';

export class lineupDetails extends lineup {
	constructor(editionId) {
		super(editionId);
	}

	update() {
		this.lineup;
	}

	render() {
		let fragment = document.createDocumentFragment();
		const dialogboxSettings = {
			id: LINEUP.SECTION_ID,
			title: 'Lineup',
			content: fragment,
			closeAction: this.toggleDetails,
			closeTitle: 'hide lineup details',
		};

		this.lineup;

		return addDialogbox(dialogboxSettings);
	}
}