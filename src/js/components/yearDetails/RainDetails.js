import LINK from '../../elementHandlers/link';
import RAIN from './elementHandlers/rain';
import addElement from '../../utils/addElement';
import * as dialogbox from '../../utils/addDialogbox';
import setIcon from '../../utils/setIcon';
import icons from '../../helpers/iconsLibrary';
import Edition from '../../classes/Edition';

const RAIN_LABEL = {
	TRUE: 'yes',
	FALSE: 'no',
};

export default class RainDetails extends Edition {
	toggleDetails(e) {
		e.preventDefault();

		const headerEl = document.querySelector(`.${RAIN.HEADER_CLASS}`);
		const target = this.getAttribute('href').replace('#', '');

		headerEl.classList.toggle(RAIN.HEADER_HIDDEN_CLASS);
		dialogbox.toggleDialogboxAction(`#${target}`);
	}

	decorateRainDayDetails() {
		const fragment = document.createDocumentFragment();

		this.editionDetails.forEach((edition) => {
			const rain = edition.rain ? RAIN_LABEL.TRUE : RAIN_LABEL.FALSE;
			const spanDay = addElement('span', {
				children: edition.day,
				classNames: RAIN.DETAILS_ITEM_DAY_CLASS,
			});
			const spanRain = addElement('span', {
				children: rain,
				classNames: RAIN.DETAILS_ITEM_RAIN_CLASS,
			});
			const li = addElement('li', {
				children: [
					spanDay,
					spanRain,
				],
				classNames: RAIN.DETAILS_ITEM_CLASS,
			});

			fragment.appendChild(li);
		});

		return fragment;
	}

	renderRainDetailsLink() {
		const settings = {
			children: [
				'more',
				setIcon(icons.plus(), `${LINK.ICON_CLASS}`),
			],
			classNames: [
				LINK.BASIC_CLASS,
				LINK.INVERTED_STYLE_CLASS,
				LINK.SIZE_S_CLASS,
				LINK.HAS_ICON_CLASS,
				RAIN.DETAILS_LINK_CLASS,
			],
			href: `#${RAIN.DETAILS_ID}`,
			onClick: this.toggleDetails,
		};

		return addElement('a', settings);
	}

	renderRainContainer() {
		const rainDetailsLink = this.editionRain ? this.renderRainDetailsLink() : null;
		const rainHeadline = addElement('h3', {
			children: 'Rain',
			classNames: RAIN.HEADLINE_CLASS,
		});
		const header = addElement('header', {
			children: [
				rainHeadline,
				rainDetailsLink,
			],
			classNames: RAIN.HEADER_CLASS,
		});
		const settings = {
			children: header,
			id: RAIN.SECTION_ID,
		};

		return addElement('section', settings);
	}

	selectRainInfo(target) {
		const targetEl = target;

		if (this.editionRain === true) {
			targetEl.classList.remove(RAIN.INFO_NO_CLASS);
			targetEl.classList.add(RAIN.INFO_YES_CLASS);
			targetEl.textContent = RAIN_LABEL.TRUE;
		} else {
			targetEl.classList.remove(RAIN.INFO_YES_CLASS);
			targetEl.classList.add(RAIN.INFO_NO_CLASS);
			targetEl.textContent = RAIN_LABEL.FALSE;
		}
	}

	renderRainInfo() {
		const div = addElement('div', {
			classNames: RAIN.INFO_CLASS,
		});

		this.selectRainInfo(div);

		return div;
	}

	updateRainInfo() {
		const rainInfo = document.querySelector(`.${RAIN.INFO_CLASS}`);
		const isRainy = rainInfo.classList.contains(RAIN.INFO_YES_CLASS);
		const newRain = this.editionRain;

		if (isRainy !== newRain) {
			rainInfo.textContent = ''; // to clear rain info container
			this.selectRainInfo(rainInfo);
		}
	}

	updateRainDayDetails() {
		const rainDetailsEl = document.getElementById(RAIN.DETAILS_ID);
		const rainDetailsListEl = document.querySelector(`.${RAIN.DETAILS_LIST_CLASS}`);

		if (rainDetailsEl && this.editionRain) {
			rainDetailsListEl.textContent = ''; // to clear rain details list
			rainDetailsListEl.appendChild(this.decorateRainDayDetails());
		} else if (!rainDetailsEl && this.editionRain) {
			document.querySelector(`.${RAIN.HEADER_CLASS}`).appendChild(this.renderRainDetailsLink());
			document.getElementById(RAIN.SECTION_ID).appendChild(this.renderRainDetails());
		} else {
			document.querySelector(`.${RAIN.HEADER_CLASS}`).classList.remove(RAIN.HEADER_HIDDEN_CLASS);
			document.querySelector(`.${RAIN.DETAILS_LINK_CLASS}`).remove();
			rainDetailsEl.remove();
		}
	}

	renderRainDetails() {
		const ul = addElement('ul', {
			children: this.decorateRainDayDetails(),
			classNames: RAIN.DETAILS_LIST_CLASS,
		});

		return dialogbox.addDialogbox({
			id: RAIN.DETAILS_ID,
			classNames: [RAIN.DETAILS_CLASS],
			stretched: true,
			title: 'Rain',
			content: ul,
			closeAction: this.toggleDetails,
			closeTitle: 'hide rain details',
		});
	}

	updateRainDetails() {
		this.updateRainInfo();
		this.updateRainDayDetails();
	}

	render() {
		const fragment = document.createDocumentFragment();
		const rainContainer = this.renderRainContainer();
		const rainInfo = this.renderRainInfo();
		const rainDetails = this.renderRainDetails();

		fragment.appendChild(rainInfo);
		if (this.editionRain) {
			fragment.appendChild(rainDetails);
		}
		rainContainer.appendChild(fragment);

		return rainContainer;
	}
}
