'use strict';

import { DATA_URL } from './enums/data';
import { introView } from './views/introView'

import '../less/app.less';

function app() {
	fetch(DATA_URL)
		.then(response => response.json())
		.then((data) => {
			const intro = new introView(data);

			intro.render();
		})
		.catch((error) => {
			console.log(error);
		});
}
app();