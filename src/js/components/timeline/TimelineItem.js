import DATA_URL from '../../enums/data';
import TIMELINE from './elementHandlers/timeline';
import addElement from '../../utils/addElement';
import addSvgElement from '../../utils/addSvgElement';
import addSvgMask from '../../utils/addSvgMask';
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
		const textMaskSettings = {
			children: editionYear,
			classNames: TIMELINE.MAIN_EDITION_MASK_TEXT_CLASS,
			properties: [
				{ x: '50%' },
				{ y: '50%' },
			],
		};
		const yearMaskSettings = {
			svgClass: TIMELINE.MAIN_EDITION_MASK_CLASS,
			maskId: `yearMask${editionYear}`,
			maskShape: addSvgElement('text', textMaskSettings),
			maskBgClass: TIMELINE.MAIN_EDITION_MASK_BG_CLASS,
		};

		return addSvgMask(yearMaskSettings);
	}

	renderYear() {
		const settings = {
			children: this.editionYear,
			classNames: TIMELINE.MAIN_EDITION_YEAR_CLASS,
		};

		return addElement('span', settings);
	}

	renderMainLink() {
		const settings = {
			children: [
				this.renderYear(),
				this.renderYearMask(),
			],
			classNames: TIMELINE.MAIN_EDITION_LINK_CLASS,
			href: `#edition${this.editionId}`,
			onClick: this.switchView,
		};

		return addElement('a', settings);
	}

	renderNavLink(isActive) {
		const settings = {
			children: this.editionYear,
			classNames: [
				TIMELINE.NAV_EDITION_LINK_CLASS,
				isActive ? TIMELINE.NAV_EDITION_ACTIVE_CLASS : '',
			],
			href: `#edition${this.editionId}`,
			onClick: this.switchEdition,
		};

		return addElement('a', settings);
	}

	renderMainEdition() {
		const settings = {
			children: this.renderMainLink(),
			classNames: TIMELINE.MAIN_EDITION_CLASS,
		};

		return addElement('li', settings);
	}

	renderNavEdition(isActive) {
		const settings = {
			children: this.renderNavLink(isActive),
			classNames: TIMELINE.NAV_EDITION_CLASS,
		};

		return addElement('li', settings);
	}
}
