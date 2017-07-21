'use strict';

import { TIMELINE} from '../enums/classes';
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
			a.textContent = day.day;
			a.href = "#`${this.edition}`day`${i}";
			li.appendChild(a);
			fragment.appendChild(li);
		}
		ul.appendChild(fragment);

		return ul;
	}

	renderEditionContainer() {
		const li = document.createElement('li');
		const a = document.createElement('a');

		a.textContent = this.edition;
		a.href = "#`${this.edition}`";
		li.classList.add(TIMELINE.EDITION_CLASS);
		li.appendChild(a);
		li.appendChild(this.renderEditionDays());

		return li
	}

	render() {
		document.querySelector('#timeline .editions').appendChild(this.renderEditionContainer());
	}
}