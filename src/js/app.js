'use strict';

import { DATA_URL } from './enums/data';
import { yearView } from './views/yearView'

import '../less/app.less';

function app() {
	fetch(DATA_URL)
		.then(response => response.json())
		.then((data) => {
			const yearDetailsView = new yearView(data);

			yearDetailsView.render();
		})
		.catch((error) => {
			console.log(error);
		});
}
app();