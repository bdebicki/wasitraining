import { renderTimeline } from '../actions/renderTimeline';
import { renderEditionDetails } from '../actions/renderEditionDetails';

export class yearView {
	constructor(data) {
		this.data = data
	}

	render() {
		const activeEdition = Object.keys(this.data).length;

		renderTimeline(this.data, activeEdition);
		renderEditionDetails(this.data[activeEdition]);
	}
}