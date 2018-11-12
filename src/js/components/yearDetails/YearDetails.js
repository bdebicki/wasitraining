import addElement from '../../utils/addElement';
import LAYOUT from '../../elementHandlers/layout';
import EditionDetails from './EditionDetails';
import RainDetails from './RainDetails';
import LineupDetails from './LineupDetails';

export default class YearDetails {
	constructor(editionId) {
		this.editionId = editionId;
	}

	static renderYearContainer() {
		return addElement('section', {
			id: LAYOUT.YEAR_CONTAINER_ID,
		});
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

		return yearBlock;
	}
}
