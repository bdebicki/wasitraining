'use strict';

import { DATA_URL } from '../../enums/data';
import { TIMELINE } from '../../enums/elementHandlers';
import { addSVGmask, svgType } from '../../utils/addElement';
import { edition } from '../../classes/edition';
import { yearView } from '../../views/yearView';

export class timelineItem extends edition {
	constructor(data) {
		super(data);
	}

	switchView(e) {
		const id = this.getAttribute('href').replace('#edition', '');

		e.preventDefault();

		fetch(DATA_URL)
			.then(response => response.json())
			.then((data) => {
				const year = new yearView(data, id);

				year.switchToYearView();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	switchEdition(e) {
		const id = this.getAttribute('href').replace('#edition', '');

		e.preventDefault();

		fetch(DATA_URL)
			.then(response => response.json())
			.then((data) => {
				const year = new yearView(data, id);

				year.updateDetails(this);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	renderYearMask() {
		const editionYear = this.editionYear;
		let textMask = document.createElementNS(svgType, 'text');

		textMask.classList.add(TIMELINE.MAIN_EDITION_MASK_TEXT_CLASS);
		textMask.setAttributeNS(null, 'x', '50%');
		textMask.setAttributeNS(null, 'y', '50%');
		textMask.textContent = editionYear;

		const maskOptions = {
			svgClass: TIMELINE.MAIN_EDITION_MASK_CLASS,
			maskId: `yearMask${editionYear}`,
			maskShape: textMask,
			maskBgClass: TIMELINE.MAIN_EDITION_MASK_BG_CLASS,
		};

		return addSVGmask(maskOptions);
	}

	renderYear() {
		let span = document.createElement('span');

		span.classList.add(TIMELINE.MAIN_EDITION_YEAR_CLASS);
		span.textContent = this.editionYear;

		return span;
	}

	renderMainLink() {
		let a = document.createElement('a');
		const year = this.renderYear();
		const mask = this.renderYearMask();

		a.href = `#edition${this.editionId}`;
		a.classList.add(TIMELINE.MAIN_EDITION_LINK_CLASS);
		a.addEventListener('click', this.switchView, null);
		a.appendChild(year);
		a.appendChild(mask);

		return a;
	}

	renderNavLink(isActive) {
		let a = document.createElement('a');

		a.href = `#edition${this.editionId}`;
		a.classList.add(TIMELINE.NAV_EDITION_LINK_CLASS);
		if (isActive) {
			a.classList.add(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
		}
		a.addEventListener('click', this.switchEdition, null);
		a.textContent = this.editionYear;

		return a;
	}

	renderMainEdition() {
		let li = document.createElement('li');

		li.classList.add(TIMELINE.MAIN_EDITION_CLASS);
		li.appendChild(this.renderMainLink());

		return li
	}

	renderNavEdition(isActive) {
		let li = document.createElement('li');

		li.classList.add(TIMELINE.NAV_EDITION_CLASS);
		li.appendChild(this.renderNavLink(isActive));

		return li
	}
}