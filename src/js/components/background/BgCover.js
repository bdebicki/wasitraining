import BG from './elementHandlers/background';
import LAYOUT from '../../elementHandlers/layout';
import addSvgElement from '../../utils/addSvgElement';

export default class BgCover {
	static renderCover() {
		const rectSettings = {
			classNames: BG.COVER_CLASS,
			properties: [
				{ height: '100%' },
				{ width: '100%' },
			],
		};
		const svgSettings = {
			id: LAYOUT.BG_COVER_ID,
			children: addSvgElement('rect', rectSettings),
		};

		return addSvgElement('svg', svgSettings);
	}

	static render() {
		return BgCover.renderCover();
	}
}
