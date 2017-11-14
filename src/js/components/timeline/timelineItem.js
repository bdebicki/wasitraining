'use strict';

import { DATA_URL } from '../../enums/data';
import { TIMELINE, ACTIVE_CLASS } from '../../enums/elementHandlers';
import { VIEW_TYPES } from '../../enums/viewTypes';
import { getViewType } from '../../utils/updateView';
import { edition } from '../../classes/edition';
import { yearView } from '../../views/yearView';

export class timelineItem extends edition {
	constructor(data) {
		super(data);
	}

	switchEdition(e) {
		e.preventDefault();

		const id = this.getAttribute('href').replace('#edition', '');
		const viewType = () => getViewType();

		fetch(DATA_URL)
			.then(response => response.json())
			.then((data) => {
				const year = new yearView(data, id);

				if(viewType() === VIEW_TYPES.INTRO) {
					year.switchToYearView();
				} else {
					year.updateDetails();
				}
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

		svg.classList.add(TIMELINE.EDITION_MASK);
		mask.id = maskId;
		mask.setAttributeNS(null, 'maskUnits', 'userSpaceOnUse');
		rectMask.classList.add(TIMELINE.EDITION_MASK_RECT);
		textMask.classList.add(TIMELINE.EDITION_MASK_TEXT);
		textMask.setAttributeNS(null, 'x', '50%');
		textMask.setAttributeNS(null, 'y', '50%');
		textMask.textContent = editionYear;
		rectBg.classList.add(TIMELINE.EDITION_MASK_BG);
		rectBg.setAttributeNS(null, 'mask', `url(#${maskId})`);

		mask.appendChild(rectMask);
		mask.appendChild(textMask);
		defs.appendChild(mask);
		svg.appendChild(defs);
		svg.appendChild(rectBg);
		fragment.appendChild(svg);

		return fragment;
	}

	renderLink() {
		let a = document.createElement('a');
		const mask = this.renderYearMask();

		// a.textContent = this.editionYear;
		a.href = `#edition${this.editionId}`;
		a.classList.add(TIMELINE.EDITION_LINK_CLASS);
		a.addEventListener('click', this.switchEdition, null);
		a.appendChild(mask);

		return a;
	}

	renderEdition(isActive) {
		let li = document.createElement('li');

		li.classList.add(TIMELINE.EDITION_CLASS);
		if(isActive) {
			li.classList.add(ACTIVE_CLASS);
		}
		li.appendChild(this.renderLink());

		return li
	}

	render(target, isActive) {
		target.appendChild(this.renderEdition(isActive));
	}
}