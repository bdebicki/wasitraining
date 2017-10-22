'use strict';

import { LAYOUT } from '../enums/elementHandlers';
import { editionDetails } from '../classes/editionDetails';

export function renderEditionDetails(editionId) {
	let details = new editionDetails(editionId);

	details.render(document.getElementById(LAYOUT.MAIN_DETAILS_CONTAINER_ID));
}