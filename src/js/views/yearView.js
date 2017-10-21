import { header } from '../components/header/header';
import { renderTimeline } from '../actions/renderTimeline';
import { renderEditionDetails } from '../actions/renderEditionDetails';

export class yearView {
	constructor(data) {
		this.data = data
	}

	render() {
		const activeEdition = Object.keys(this.data).length;
		const headerBlock = new header(this.data);

		headerBlock.render();

		// renderTimeline(this.data, activeEdition);
		renderEditionDetails(this.data[activeEdition]);
	}
}