import BG from './elementHandlers/background';
import LAYOUT from '../../elementHandlers/layout';
import RAIN from '../yearDetails/elementHandlers/rain';
import addElement from '../../utils/addElement';
import addSvgElement from '../../utils/addSvgElement';
import addSvgMask from '../../utils/addSvgMask';

export default class BgCover {
	static renderCoverContainer() {
		const settings = {
			id: LAYOUT.BG_COVER_ID,
		};

		return addElement('div', settings);
	}

	static renderRainYesMask() {
		const svgMask = addSvgElement('path', {
			classNames: RAIN.YES_SHAPE_CLASS,
			properties: { d: 'M56.977-57.755,3.21-149.607H56.977l25.29,46.989,27.415-46.989h53.555L107.345-57.755V-.985H56.977Zm116.886-91.852H283.949V-107.3H224.231v12.97h42.291v38.059H224.231V-43.3h59.718V-.985H173.863ZM314.551-.773q-14.876-2.977-24.227-8.08v-43.8a101.009,101.009,0,0,0,25.184,10.206,99.426,99.426,0,0,0,24.546,3.4q6.376,0,9.138-1.276a4.224,4.224,0,0,0,2.763-4.04q0-3.827-4.25-6.485T329.64-59.668q-20.4-8.93-29.647-19.88t-9.245-26.684a40.37,40.37,0,0,1,7.544-24.132q7.544-10.525,21.252-16.478t31.347-5.953a127.247,127.247,0,0,1,25.715,2.339,93.371,93.371,0,0,1,21.464,7.229v42.311q-19.127-10.631-37.829-10.631-15.089,0-15.089,6.591,0,3.189,3.507,5.316A95.005,95.005,0,0,0,361.306-93.9l7.863,3.189q15.089,6.379,23.165,12.651A36.061,36.061,0,0,1,403.81-63.815q3.4,7.973,3.4,20.093,0,21.475-15.726,33.7T344.092,2.2A150.25,150.25,0,0,1,314.551-.773Z' }, // eslint-disable-line max-len
		});
		const maskSettings = {
			maskId: 'rainInfoMaskYes',
			maskShape: svgMask,
		};

		return addSvgMask(maskSettings);
	}

	static renderRainNoMask() {
		const svgMask = addSvgElement('path', {
			classNames: RAIN.NO_SHAPE_CLASS,
			properties: { d: 'M7-139.611H51.447l44.234,69.1v-69.1h48.275V9.011H99.509L55.275-60.3V9.011H7ZM194.25,2.419A73.793,73.793,0,0,1,165.222-24.9q-10.633-17.541-10.633-40.292t10.633-40.4a73.556,73.556,0,0,1,29.029-27.428q18.4-9.781,41.15-9.781,22.542,0,40.938,9.781a73.556,73.556,0,0,1,29.029,27.428Q316-87.944,316-65.194T305.367-24.9A73.792,73.792,0,0,1,276.338,2.419Q257.943,12.2,235.4,12.2,212.646,12.2,194.25,2.419Zm62.2-45.713q8.294-8.08,8.294-21.9t-8.294-21.9q-8.294-8.08-21.054-8.08-12.972,0-21.266,8.08t-8.294,21.9q0,13.82,8.4,21.9t21.16,8.08Q248.16-35.214,256.454-43.294Z' }, // eslint-disable-line max-len
		});
		const maskSettings = {
			svgClass: RAIN.MASK_CLASS,
			maskId: 'rainInfoMaskNo',
			maskShape: svgMask,
		};

		return addSvgMask(maskSettings);
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
			defs: [
				BgCover.renderRainYesMask(),
				BgCover.renderRainNoMask(),
			],
			children: [
				addSvgElement('rect', rectSettings),
			],
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