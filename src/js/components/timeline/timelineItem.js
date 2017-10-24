'use strict';

import { TIMELINE, ACTIVE_CLASS } from '../../enums/elementHandlers';
import { DATA_URL } from '../../enums/data';
import { edition } from '../../classes/edition';
import { updateDetails } from '../../utils/updateEditionDetails';

export class timelineItem extends edition {
	constructor(data) {
		super(data);
	}

	switchEdition(e) {
		e.preventDefault();

		const id = this.getAttribute('href').replace('#edition', '');

		fetch(DATA_URL)
			.then(response => response.json())
			.then((data) => {
				updateDetails(data[id]);
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