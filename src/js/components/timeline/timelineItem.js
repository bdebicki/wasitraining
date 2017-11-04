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

	renderLink() {
		let a = document.createElement('a');

		a.textContent = this.editionYear;
		a.classList.add(TIMELINE.EDITION_LINK_CLASS);
		a.href = `#edition${this.editionId}`;
		a.addEventListener('click', this.switchEdition, null);

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