import { header } from '../components/header/header';
import { renderEditionDetails } from '../actions/renderEditionDetails';

export class yearView {
	constructor(data) {
		this.data = data
	}

	render() {
		const activeEdition = Object.keys(this.data).length;
		const headerBlock = new header(this.data, activeEdition);

		headerBlock.render();

		renderEditionDetails(this.data[activeEdition]);
	}
}