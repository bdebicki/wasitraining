import EDITION from './elementHandlers/edition';
import addElement from '../../utils/addElement';
import Edition from '../../classes/Edition';
import Headliners from '../../classes/Headliners';
import LineupDetails from './LineupDetails';

export default class EditionDetails extends Edition {
	constructor(editionId) {
		super(editionId);

		this.headlinersDetails = new Headliners(editionId);
	}

	static getCurrentEditionYear() {
		return document.getElementById(EDITION.EDITION_DETAILS_ID).dataset.year;
	}

	decorateEditionDates() {
		const { editionDate } = this;

		if (typeof editionDate === 'string') {
			return editionDate;
		}

		return `${editionDate.firstDay} - ${editionDate.lastDay}`;
	}

	decorateEditionHeadliners() {
		const fragment = document.createDocumentFragment();

		this.headlinersDetails.headliners.forEach((item) => {
			const li = addElement('li', {
				children: item,
				classNames: EDITION.HEADLINER_CLASS,
			});

			fragment.appendChild(li);
		});

		return fragment;
	}

	renderEditionContainer() {
		const settings = {
			classNames: `${EDITION.EDITION_DETAILS_YEAR_CLASS}${this.editionYear}`,
			dataAttr: { year: this.editionYear },
			id: EDITION.EDITION_DETAILS_ID,
		};

		return addElement('section', settings);
	}

	renderEditionDetails() {
		const fragment = document.createDocumentFragment();
		const editionYear = addElement('h2', {
			children: this.editionYear,
			classNames: EDITION.YEAR_CLASS,
		});
		const name = addElement('h3', {
			children: this.editionFullName,
			classNames: EDITION.FULL_NAME_CLASS,
		});
		const dates = addElement('p', {
			children: this.decorateEditionDates(),
			classNames: EDITION.DATES_CLASS,
		});
		const place = addElement('p', {
			children: this.editionPlace,
			classNames: EDITION.PLACE_CLASS,
		});

		fragment.appendChild(editionYear);
		fragment.appendChild(name);
		fragment.appendChild(dates);
		fragment.appendChild(place);

		return fragment;
	}

	renderShortLineupContainer() {
		const settings = {
			classNames: [
				EDITION.LINEUP_CLASS,
				`${EDITION.LINEUP_EDITION_CLASS}${this.editionYear}`,
			],
		};

		return addElement('div', settings);
	}

	updateHeadliners(oldYear) {
		const shortLineupContainer = document.querySelector(`.${EDITION.LINEUP_CLASS}`);

		shortLineupContainer.classList.remove(`${EDITION.LINEUP_EDITION_CLASS}${oldYear}`);
		shortLineupContainer.classList.add(`${EDITION.LINEUP_EDITION_CLASS}${this.editionYear}`);
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).textContent = ''; // to clear rain details list

		return this.decorateEditionHeadliners();
	}

	renderHeadliners() {
		const settings = {
			children: this.decorateEditionHeadliners(),
			classNames: EDITION.HEADLINERS_CLASS,
		};

		return addElement('ul', settings);
	}

	updateEditionDetails() {
		const detailsContainer = document.getElementById(EDITION.EDITION_DETAILS_ID);
		const oldYear = EditionDetails.getCurrentEditionYear();
		const newYear = this.editionYear;

		detailsContainer.classList.remove(`${EDITION.EDITION_DETAILS_YEAR_CLASS}${oldYear}`);
		detailsContainer.classList.add(`${EDITION.EDITION_DETAILS_YEAR_CLASS}${newYear}`);
		detailsContainer.dataset.year = newYear;

		document.querySelector(`.${EDITION.YEAR_CLASS}`).textContent = newYear;
		document.querySelector(`.${EDITION.DATES_CLASS}`).textContent = this.decorateEditionDates();
		document.querySelector(`.${EDITION.FULL_NAME_CLASS}`).textContent = this.editionFullName;
		document.querySelector(`.${EDITION.PLACE_CLASS}`).textContent = this.editionPlace;
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).appendChild(this.updateHeadliners(oldYear));
	}

	render() {
		const editionContainer = this.renderEditionContainer();
		const editionDetails = this.renderEditionDetails();
		const lineupContainer = this.renderShortLineupContainer();
		const headliners = this.renderHeadliners();
		const lineupLink = LineupDetails.renderLineupLink();

		lineupContainer.appendChild(headliners);
		lineupContainer.appendChild(lineupLink);
		editionContainer.appendChild(editionDetails);
		editionContainer.appendChild(lineupContainer);

		return editionContainer;
	}
}
