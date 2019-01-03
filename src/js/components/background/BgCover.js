import BG from './elementHandlers/background';
import LAYOUT from '../../elementHandlers/layout';
import addElement from '../../utils/addElement';
import addSvgElement from '../../utils/addSvgElement';

export default class BgCover {
	static renderCoverContainer() {
		const settings = {
			id: LAYOUT.BG_COVER_ID,
		};

		return addElement('div', settings);
	}

	static renderCover() {
		const rectSettings = {
			properties: [
				{ height: '100%' },
				{ width: '100%' },
			],
		};
		const svgSettings = {
			classNames: BG.COVER_CLASS,
			children: addSvgElement('rect', rectSettings),
			properties: [
				{ height: '100%' },
				{ width: '100%' },
			],
		};

		return addSvgElement('svg', svgSettings);
	}

	static render() {
		const coverBlock = BgCover.renderCoverContainer();

		coverBlock.appendChild(BgCover.renderCover());

		return coverBlock;
	}
}
