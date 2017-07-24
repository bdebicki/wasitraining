'use strict';

import { editionDetails } from './editionDetails';
import { LAYOUT } from '../enums/classes';

export function renderEditionDetails(editionId) {
	let details = new editionDetails(editionId);

	details.render(document.getElementById(LAYOUT.MAIN_CONTAINER_ID));
}