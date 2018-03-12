import { LAYOUT, BG } from '../../enums/elementHandlers';
import { addVideo } from '../../utils/addElement';

export class bgVideo {
	constructor(target) {
		this.target = target;
	}

	renderVideoContainer() {
		const div = document.createElement('div');

		div.id = LAYOUT.BG_VIDEO_ID;

		return div;
	}

	renderVideo() {
		const settings = {
			classNames: BG.VIDEO_CLASS,
			src: '/videos/bg-video.webm',
			placeholder: '/images/bg-img.png',
			width: '1366',
			height: '768',
		};

		return addVideo(settings);
	}

	renderImg() {
		const img = document.createElement('img');

		img.classList.add(BG.VIDEO_CLASS);
		img.src = '/images/bg-img.png';
		img.width = '1366';
		img.height = '768';

		return img;
	}

	render() {
		const videoBlock = this.renderVideoContainer();

		videoBlock.appendChild(this.renderVideo());

		document.getElementById(this.target).appendChild(videoBlock);
	}
}
