'use strict';

import { renderTimeline } from './components/renderTimeline';
import { renderEditionDetails } from './components/renderEditionDetails';

function app() {
	fetch('./js/festivalEditions.json')
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