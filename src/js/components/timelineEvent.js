'use strict';

import { TIMELINE, ACTIVE_CLASS } from '../enums/classes';
import { edition } from './edition';

export class timelineEvent extends edition {
	constructor(data) {
		super(data);
	}

	renderEditionContainer(isActive) {
		const li = document.createElement('li');
		const a = document.createElement('a');

		a.textContent = this.editionYear;
		a.href = `#${this.editionYear}`;
		li.classList.add(TIMELINE.EDITION_CLASS);
		if(isActive) {
			li.classList.add(ACTIVE_CLASS);
		}
		li.appendChild(a);

		return li
	}

	render(target, isActive) {
		target.appendChild(this.renderEditionContainer(isActive));
	}
}