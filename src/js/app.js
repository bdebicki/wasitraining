'use strict';

import { DATA_URL } from './enums/data';
import { renderTimeline } from './actions/renderTimeline';
import { renderEditionDetails } from './actions/renderEditionDetails';

import '../data/festivalEditions.json';
import '../less/app.less';

function app() {
	fetch(DATA_URL)
		.then(response => response.json())
		.then((data) => {
			const activeEdition = Object.keys(data).length;

			renderTimeline(data, activeEdition);
			renderEditionDetails(data[activeEdition]);
		})
		.catch((error) => {
			console.log(error);
		});
}
app();