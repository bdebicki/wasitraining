'use strict';

import { DATA_URL } from './enums/data';
import { renderTimeline } from './actions/renderTimeline';
import { renderEditionDetails } from './actions/renderEditionDetails';

function app() {
	fetch(DATA_URL)
		.then(response => response.json())
		.then((data) => {
			renderTimeline(data);
			renderEditionDetails(data[1], data);

		})
		.catch((error) => {
			console.log(error);
		});
}
app();