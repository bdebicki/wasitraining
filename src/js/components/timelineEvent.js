'use strict';

import { TIMELINE } from '../enums/classes';
import { edition } from './edition';

export class timelineEvent extends edition {
	constructor(data) {
		super(data);
	}

	renderEditionDays() {
		const fragment = document.createDocumentFragment();
		const ul = document.createElement('ul');

		ul.classList.add(TIMELINE.EDITION_DETAILS_CLASS);

		for(let [i, day] of this.editionDays.entries()) {
			const li = document.createElement('li');
			const a = document.createElement('a');
			const dayCount = i + 1;

			a.textContent = day.day;
			a.href = `#${this.editionName}day${dayCount}`;
			li.appendChild(a);
			fragment.appendChild(li);
		}
		ul.appendChild(fragment);

		return ul;
	}

	renderEditionContainer() {
		const li = document.createElement('li');
		const a = document.createElement('a');

		a.textContent = this.editionName;
		a.href = `#${this.editionName}`;
		li.classList.add(TIMELINE.EDITION_CLASS);
		li.appendChild(a);
		li.appendChild(this.renderEditionDays());

		return li
	}

	render() {
		document.querySelector('#timeline .editions').appendChild(this.renderEditionContainer());
	}
}