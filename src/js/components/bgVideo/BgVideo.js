import BG from './elementHandlers/background';
import LAYOUT from '../../elementHandlers/layout';
import addVideo from '../../utils/addVideo';

export default class BgVideo {
	constructor(target) {
		this.target = target;
	}

	static renderVideoContainer() {
		const div = document.createElement('div');

		div.id = LAYOUT.BG_VIDEO_ID;

		return div;
	}

	static renderVideo() {
		const settings = {
			classNames: BG.VIDEO_CLASS,
			src: '/videos/bg-video.webm',
			placeholder: '/images/bg-img.png',
			width: '1366',
			height: '768',
		};

		return addVideo(settings);
	}

	render() {
		const videoBlock = BgVideo.renderVideoContainer();

		videoBlock.appendChild(BgVideo.renderVideo());

		document.getElementById(this.target).appendChild(videoBlock);
	}
}
