'use strict';

import { LAYOUT, TIMELINE } from '../../enums/elementHandlers';
import { timelineItem } from './timelineItem';

export class navTimeline {
	constructor(data, target) {
		this.data = data;
		this.target = target;
	}

	render() {
		let timelineContainer = document.createElement('nav');

		timelineContainer.id = LAYOUT.NAV_TIMELINE_ID;
		document.getElementById(this.target).appendChild(timelineContainer);
	}
}