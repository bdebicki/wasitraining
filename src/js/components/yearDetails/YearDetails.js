import { LAYOUT } from '../../enums/elementHandlers';
import EditionDetails from './EditionDetails';
import RainDetails from './RainDetails';
import LineupDetails from './LineupDetails';

export default class YearDetails {
	constructor(editionId, target) {
		this.editionId = editionId;
		this.target = target;
	}

	static renderYearContainer() {
		const section = document.createElement('section');

		section.id = LAYOUT.YEAR_CONTAINER_ID;

		return section;
	}

	updateYearDetails() {
		const { editionId } = this;
		const editionBlock = new EditionDetails(editionId);
		const rainBlock = new RainDetails(editionId);
		const lineupDialogbox = new LineupDetails(editionId);

		editionBlock.updateEditionDetails();
		rainBlock.updateRainDetails();
		lineupDialogbox.updateLineupDetails();
	}

	render() {
		const { editionId } = this;
		const yearBlock = YearDetails.renderYearContainer();
		const editionBlock = new EditionDetails(editionId);
		const rainBlock = new RainDetails(editionId);
		const lineupDialogbox = new LineupDetails(editionId);

		yearBlock.appendChild(editionBlock.render());
		yearBlock.appendChild(rainBlock.render());
		yearBlock.appendChild(lineupDialogbox.render());
		document.getElementById(this.target).appendChild(yearBlock);
	}
}