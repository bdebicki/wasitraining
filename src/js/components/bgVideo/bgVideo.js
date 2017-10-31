'use strict';

import { LAYOUT, VIDEO } from '../../enums/elementHandlers';

export class bgVideo {
	constructor(target) {
		this.target = target;
	}

	renderVideoContainer() {
		let div = document.createElement('div');

		div.id = LAYOUT.BG_VIDEO_ID;

		return div;
	}

	renderVideo() {
		let video = document.createElement('video');

		video.classList.add(VIDEO.VIDEO_CLASS);
		video.setAttribute('src', '/videos/bg-video.webm');
		video.setAttribute('poster', '/images/bg-img.png');
		video.width = '1366';
		video.height = '768';
		video.setAttribute('autoplay', '');
		video.setAttribute('loop', '');

		return video;
	}

	renderImg() {
		let img = document.createElement('img');

		img.classList.add(VIDEO.VIDEO_CLASS);
		img.src = '/images/bg-img.png';
		img.width = '1366';
		img.height = '768';

		return img;
	}

	render() {
		let videoBlock = this.renderVideoContainer();

		videoBlock.appendChild(this.renderImg());

		document.getElementById(this.target).appendChild(videoBlock);
	}
}