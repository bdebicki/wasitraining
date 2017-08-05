'use strict';

import { LAYOUT } from '../enums/classes';
import { editionDetails } from '../classes/editionDetails';

export function renderEditionDetails(editionId) {
	let details = new editionDetails(editionId);

	details.render(document.getElementById(LAYOUT.MAIN_CONTAINER_ID));
}