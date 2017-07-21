'use strict';

import { renderTimeline } from './components/timeline';

function app() {
	fetch('./js/festivalEditions.json')
		.then(response => response.json())
		.then((data) => {
			renderTimeline(data);
		})
		.catch((error) => {
			console.log(error);
		});
}
app();