'use strict';

import { DATA_URL } from '../../enums/data';
import { TIMELINE } from '../../enums/elementHandlers';
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
		const maskId = `yearMask${editionYear}`;
		const xmlns = "http://www.w3.org/2000/svg";
		let fragment = document.createDocumentFragment();
		let svg = document.createElementNS(xmlns, 'svg');
		let defs = document.createElementNS(xmlns, 'defs');
		let mask = document.createElementNS(xmlns, 'mask');
		let rectMask = document.createElementNS(xmlns, 'rect');
		let textMask = document.createElementNS(xmlns, 'text');
		let rectBg = document.createElementNS(xmlns, 'rect');

		svg.classList.add(TIMELINE.MAIN_EDITION_MASK_CLASS);
		mask.id = maskId;
		mask.setAttributeNS(null, 'maskUnits', 'userSpaceOnUse');
		rectMask.classList.add(TIMELINE.MAIN_EDITION_MASK_RECT_CLASS);
		textMask.classList.add(TIMELINE.MAIN_EDITION_MASK_TEXT_CLASS);
		textMask.setAttributeNS(null, 'x', '50%');
		textMask.setAttributeNS(null, 'y', '50%');
		textMask.textContent = editionYear;
		rectBg.classList.add(TIMELINE.MAIN_EDITION_MASK_BG_CLASS);
		rectBg.setAttributeNS(null, 'mask', `url(#${maskId})`);

		mask.appendChild(rectMask);
		mask.appendChild(textMask);
		defs.appendChild(mask);
		svg.appendChild(defs);
		svg.appendChild(rectBg);
		fragment.appendChild(svg);

		return fragment;
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

	renderNavLink() {
		let a = document.createElement('a');

		a.href = `#edition${this.editionId}`;
		a.classList.add(TIMELINE.NAV_EDITION_LINK_CLASS);
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
		if(isActive) {
			li.classList.add(TIMELINE.NAV_EDITION_ACTIVE_CLASS);
		}
		li.appendChild(this.renderNavLink());

		return li
	}
}