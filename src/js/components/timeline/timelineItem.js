'use strict';

import { DATA_URL } from '../../enums/data';
import { TIMELINE, ACTIVE_CLASS } from '../../enums/elementHandlers';
import { VIEW_TYPES } from '../../enums/viewTypes';
import { updateDetails } from '../../utils/updateEditionDetails';
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
				if(viewType() === VIEW_TYPES.INTRO) {
					const year = new yearView(data, id);
					year.switchToYearView();
				} else {
					updateDetails(data[id]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	renderLink() {
		const a = document.createElement('a');

		a.textContent = this.editionYear;
		a.href = `#edition${this.editionId}`;
		a.addEventListener('click', this.switchEdition, null);

		return a;
	}

	renderEdition(isActive) {
		const li = document.createElement('li');

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