import DATA_URL from '../../enums/data';
import TIMELINE from './elementHandlers/timeline';
import addElement from '../../utils/addElement';
import { addSVGmask, svgType } from '../../utils/addSvgMask';
import Edition from '../../classes/Edition';
import YearView from '../../views/YearView';

export default class TimelineItem extends Edition {
	static getEditionIdFromHref(link) {
		return parseInt(link.getAttribute('href').replace('#edition', ''), 10);
	}

	switchView(e) {
		const id = TimelineItem.getEditionIdFromHref(this);

		e.preventDefault();

		fetch(DATA_URL)
			.then((response) => response.json())
			.then((data) => {
				const year = new YearView(data, id);

				year.switchToYearView();
			})
			.catch((error) => {
				console.log(error); // eslint-disable-line no-console
			});
	}

	switchEdition(e) {
		const id = TimelineItem.getEditionIdFromHref(this);

		e.preventDefault();

		fetch(DATA_URL)
			.then((response) => response.json())
			.then((data) => {
				const year = new YearView(data, id);

				year.updateDetails(this);
			})
			.catch((error) => {
				console.log(error); // eslint-disable-line no-console
			});
	}

	renderYearMask() {
		const { editionYear } = this;
		const textMask = document.createElementNS(svgType, 'text');

		textMask.classList.add(TIMELINE.MAIN_EDITION_MASK_TEXT_CLASS);
		textMask.setAttributeNS(null, 'x', '50%');
		textMask.setAttributeNS(null, 'y', '50%');
		textMask.textContent = editionYear;

		const maskOptions = {
			svgClass: TIMELINE.MAIN_EDITION_MASK_CLASS,
			maskId: `yearMask${editionYear}`,
			maskShape: textMask,
			maskBgClass: TIMELINE.MAIN_EDITION_MASK_BG_CLASS,
		};

		return addSVGmask(maskOptions);
	}

	renderYear() {
		return addElement('span', {
			children: this.editionYear,
			classNames: TIMELINE.MAIN_EDITION_YEAR_CLASS,
		});
	}

	renderMainLink() {
		return addElement('a', {
			children: [
				this.renderYear(),
				this.renderYearMask(),
			],
			classNames: TIMELINE.MAIN_EDITION_LINK_CLASS,
			href: `#edition${this.editionId}`,
			onClick: this.switchView,
		});
	}

	renderNavLink(isActive) {
		return addElement('a', {
			children: this.editionYear,
			classNames: [
				TIMELINE.NAV_EDITION_LINK_CLASS,
				isActive ? TIMELINE.NAV_EDITION_ACTIVE_CLASS : '',
			],
			href: `#edition${this.editionId}`,
			onClick: this.switchEdition,
		});
	}

	renderMainEdition() {
		return addElement('li', {
			children: this.renderMainLink(),
			classNames: TIMELINE.MAIN_EDITION_CLASS,
		});
	}

	renderNavEdition(isActive) {
		return addElement('li', {
			children: this.renderNavLink(isActive),
			classNames: TIMELINE.NAV_EDITION_CLASS,
		});
	}
}
