import BG from './elementHandlers/background';
import LAYOUT from '../../elementHandlers/layout';
import addElement from '../../utils/addElement';
import addVideo from '../../utils/addVideo';

export default class BgVideo {
	static renderVideoContainer() {
		const settings = {
			id: LAYOUT.BG_VIDEO_ID,
		};

		return addElement('div', settings);
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

	static render() {
		const videoBlock = BgVideo.renderVideoContainer();

		videoBlock.appendChild(BgVideo.renderVideo());

		return videoBlock;
	}
}
