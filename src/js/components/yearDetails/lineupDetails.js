'use strict';

import { lineup } from "../../classes/lineup";
import { LINEUP, DIALOGBOX } from "../../enums/elementHandlers";
import { addDialogbox } from '../../utils/addDialogbox';

const DIALOGBOX_HEADLINE_TEXT = 'Lineup';

export class lineupDetails extends lineup {
	constructor(editionId) {
		super(editionId);
	}

	update() {
		document.querySelector(`#${LINEUP.SECTION_ID} .${DIALOGBOX.HEADLINE_CLASS}`).textContent = `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`;

		this.lineup;
	}

	render() {
		let fragment = document.createDocumentFragment();
		const dialogboxSettings = {
			id: LINEUP.SECTION_ID,
			title: `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`,
			content: fragment,
			closeAction: this.toggleDetails,
			closeTitle: 'hide lineup details',
		};

		this.lineup;

		return addDialogbox(dialogboxSettings);
	}
}