'use strict';

import { RAIN, VISIBILITY_CLASS } from '../../enums/elementHandlers';
import { edition } from '../../classes/edition';

export class rainDetails extends edition {
	constructor(editionId) {
		super(editionId);
	};

	toggleDetails(e) {
		e.preventDefault();

		const target = this.getAttribute('href').replace('#', '');
		const targetEl = document.getElementById(target);

		if(targetEl.classList.contains(VISIBILITY_CLASS)) {
			targetEl.classList.remove(VISIBILITY_CLASS);
		} else {
			targetEl.classList.add(VISIBILITY_CLASS);
		}
	}

	renderRainDetailsLink() {
		const a = document.createElement('a');

		a.classList.add(RAIN.DETAILS_LINK_CLASS);
		a.href = `#${RAIN.EDITION_RAIN_DETAILS_ID}`;
		a.textContent = 'more';
		a.addEventListener('click', this.toggleDetails, null);

		return a;
	}

	renderRainContainer() {
		let section = document.createElement('section');
		let header = document.createElement('header');
		const rainHeadline = document.createElement('h3');
		const moreLink = this.renderRainDetailsLink();

		section.id = RAIN.RAIN_DETAILS_ID;
		rainHeadline.textContent = 'rain';
		header.appendChild(rainHeadline);
		header.appendChild(moreLink);
		section.appendChild(header);

		return section;
	}

	renderRainInfo() {
		const p = document.createElement('p');

		p.classList.add(RAIN.RAIN_CLASS);
		p.textContent = this.editionRain;

		return p;
	}

	renderRainDetails() {
		let fragment = document.createDocumentFragment();
		const ul = document.createElement('ul');

		ul.id = RAIN.EDITION_RAIN_DETAILS_ID;

		this.editionDetails.map((item) => {
			const li = document.createElement('li');
			const rain = item.rain ? 'yes' : 'no';

			li.textContent = `${item.day} ${rain}`;
			fragment.appendChild(li);
		});

		ul.appendChild(fragment);

		return ul;
	}

	render() {
		let fragment = document.createDocumentFragment();
		let rainContainer = this.renderRainContainer();
		const rainInfo = this.renderRainInfo();
		const rainDetails = this.renderRainDetails();

		fragment.appendChild(rainInfo);
		fragment.appendChild(rainDetails);
		rainContainer.appendChild(fragment);

		return rainContainer;
	};
}