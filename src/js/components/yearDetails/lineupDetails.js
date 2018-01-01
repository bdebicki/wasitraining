'use strict';

import { lineup } from "../../classes/lineup";
import { LINEUP, DIALOGBOX, LINK, EDITION } from "../../enums/elementHandlers";
import * as dialogbox from '../../utils/addDialogbox';
import { setIcon } from "../../utils/setIcon";
import { icons } from "../../utils/iconsLibrary";

const DIALOGBOX_HEADLINE_TEXT = 'Lineup';

export class lineupDetails extends lineup {
	constructor(editionId) {
		super(editionId);
	}

	update() {
		document.querySelector(`#${LINEUP.SECTION_ID} .${DIALOGBOX.HEADLINE_CLASS}`).textContent = `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`;

		this.lineup;
	}

	toggleLineup(e) {
		e.preventDefault();
		dialogbox.toggleDialogboxAction(`#${LINEUP.SECTION_ID}`);
	}

	renderLineupLink() {
		let p = document.createElement('p');
		let a = document.createElement('a');

		p.classList.add(EDITION.LINEUP_LINK_CLASS);
		a.classList.add(LINK.BASIC_CLASS, LINK.INVERTED_STYLE_CLASS, LINK.SIZE_XS_CLASS, LINK.HAS_ICON_CLASS);
		a.href = `#lineup`;
		a.textContent = 'see full lineup';
		a.appendChild(setIcon(icons.plus(), `${LINK.ICON_CLASS}`));
		a.addEventListener('click', this.toggleLineup, null);

		p.appendChild(a);

		return p;
	}

	render() {
		let fragment = document.createDocumentFragment();
		const dialogboxLineup = dialogbox.addDialogbox({
			id: LINEUP.SECTION_ID,
			classNames: ['boczek'],
			title: `${DIALOGBOX_HEADLINE_TEXT} ${this.editionYear}`,
			content: fragment,
			closeTitle: 'hide lineup details'
		});

		this.lineup;

		return dialogboxLineup;
	}
}