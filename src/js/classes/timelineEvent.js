'use strict';

import { TIMELINE, ACTIVE_CLASS } from '../enums/classes';
import { edition } from './edition';

export class timelineEvent extends edition {
	constructor(data) {
		super(data);
	}

	switchEdition(e) {
		e.preventDefault();
		console.log(this);

		console.log('toggle edition');
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