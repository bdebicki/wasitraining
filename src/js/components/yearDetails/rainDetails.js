'use strict';

import { RAIN, globalClassBuilders } from '../../enums/elementHandlers';
import { addSVGmask } from '../../utils/addElement';
import { edition } from '../../classes/edition';

export class rainDetails extends edition {
	constructor(editionId) {
		super(editionId);
	};

	toggleDetails(e) {
		e.preventDefault();

		const target = this.getAttribute('href').replace('#', '');
		const targetHiddenClassName = `${target}--${globalClassBuilders.hidden}`;
		let targetEl = document.getElementById(target);

		if(targetEl.classList.contains(targetHiddenClassName)) {
			targetEl.classList.remove(targetHiddenClassName);
		} else {
			targetEl.classList.add(targetHiddenClassName);
		}
	}

	decorateRainDayDetails() {
		let fragment = document.createDocumentFragment();

		this.editionDetails.map((item) => {
			const li = document.createElement('li');
			const spanDay = document.createElement('span');
			const spanRain = document.createElement('span');
			const rain = item.rain ? 'yes' : 'no';

			spanDay.classList.add(RAIN.DETAILS_ITEM_DAY_CLASS);
			spanDay.textContent = item.day;
			spanRain.classList.add(RAIN.DETAILS_ITEM_RAIN_CLASS);
			spanRain.textContent = rain;
			li.classList.add(RAIN.DETAILS_ITEM_CLASS);

			li.appendChild(spanDay);
			li.appendChild(spanRain);
			fragment.appendChild(li);
		});

		return fragment;
	}

	renderRainDetailsLink() {
		let a = document.createElement('a');

		a.classList.add(RAIN.DETAILS_LINK_CLASS);
		a.href = `#${RAIN.DETAILS_ID}`;
		a.textContent = 'more';
		a.addEventListener('click', this.toggleDetails, null);

		return a;
	}

	renderCloseRainDetails() {
		let a = document.createElement('a');

		a.classList.add(RAIN.CLOSE_DETAILS_CLASS);
		a.href = `#${RAIN.DETAILS_ID}`;
		a.textContent = 'close details';
		a.addEventListener('click', this.toggleDetails, null);

		return a;
	}

	renderRainContainer() {
		let section = document.createElement('section');
		let header = document.createElement('header');
		let rainHeadline = document.createElement('h3');
		let moreLink = this.renderRainDetailsLink();

		section.id = RAIN.SECTION_ID;
		header.classList.add(RAIN.HEADER_CLASS);
		rainHeadline.textContent = 'Rain';
		rainHeadline.classList.add(RAIN.HEADLINE_CLASS);
		moreLink.classList.add(RAIN.DETAILS_LINK_CLASS);
		header.appendChild(rainHeadline);
		header.appendChild(moreLink);
		section.appendChild(header);

		return section;
	}

	renderRainInfo() {
		let p = document.createElement('p');

		p.classList.add(RAIN.INFO_CLASS);
		p.textContent = this.editionRain;

		return p;
	}

	updateRainDayDetails() {
		document.getElementById(RAIN.DETAILS_ID).textContent =''; // to clear rain details list

		return this.decorateRainDayDetails();
	}

	renderRainDetails() {
		let ul = document.createElement('ul');

		ul.id = RAIN.DETAILS_ID;
		ul.classList.add(RAIN.DETAILS_HIDDEN_CLASS);
		ul.appendChild(this.decorateRainDayDetails());

		return ul;
	}

	updateRainDetails() {
		document.querySelector(`.${RAIN.INFO_CLASS}`).textContent = this.editionRain;
		document.getElementById(RAIN.DETAILS_ID).appendChild(this.updateRainDayDetails());
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