import EDITION from './elementHandlers/edition';
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
			const li = document.createElement('li');

			li.textContent = item;
			li.classList.add(EDITION.HEADLINER_CLASS);
			fragment.appendChild(li);
		});

		return fragment;
	}

	renderEditionContainer() {
		const section = document.createElement('section');

		section.id = EDITION.EDITION_DETAILS_ID;
		section.classList.add(`${EDITION.EDITION_DETAILS_YEAR_CLASS}${this.editionYear}`);
		section.dataset.year = this.editionYear;

		return section;
	}

	renderEditionDetails() {
		const fragment = document.createDocumentFragment();
		const editionYear = document.createElement('h2');
		const name = document.createElement('h3');
		const dates = document.createElement('p');
		const place = document.createElement('p');

		editionYear.classList.add(EDITION.YEAR_CLASS);
		dates.classList.add(EDITION.DATES_CLASS);
		name.classList.add(EDITION.FULL_NAME_CLASS);
		place.classList.add(EDITION.PLACE_CLASS);

		editionYear.textContent = this.editionYear;
		dates.textContent = this.decorateEditionDates();
		name.textContent = this.editionFullName;
		place.textContent = this.editionPlace;

		fragment.appendChild(editionYear);
		fragment.appendChild(name);
		fragment.appendChild(dates);
		fragment.appendChild(place);

		return fragment;
	}

	renderShortLineupContainer() {
		const div = document.createElement('div');

		div.classList.add(EDITION.LINEUP_CLASS, `${EDITION.LINEUP_EDITION_CLASS}${this.editionYear}`);

		return div;
	}

	updateHeadliners(oldYear) {
		const shortLineupContainer = document.querySelector(`.${EDITION.LINEUP_CLASS}`);

		shortLineupContainer.classList.remove(`${EDITION.LINEUP_EDITION_CLASS}${oldYear}`);
		shortLineupContainer.classList.add(`${EDITION.LINEUP_EDITION_CLASS}${this.editionYear}`);
		document.querySelector(`.${EDITION.HEADLINERS_CLASS}`).textContent = ''; // to clear rain details list

		return this.decorateEditionHeadliners();
	}

	renderHeadliners() {
		const ul = document.createElement('ul');

		ul.classList.add(EDITION.HEADLINERS_CLASS);
		ul.appendChild(this.decorateEditionHeadliners());

		return ul;
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
