import { LINK, RAIN } from '../../enums/elementHandlers';
import { addVideo, addSVGmask, svgType } from '../../utils/addElement';
import * as dialogbox from '../../utils/addDialogbox';
import setIcon from '../../utils/setIcon';
import icons from '../../utils/iconsLibrary';
import Edition from '../../classes/Edition';

export default class RainDetails extends Edition {
	constructor(editionId) {
		super(editionId);
	}

	toggleDetails(e) {
		e.preventDefault();

		const headerEl = document.querySelector(`.${RAIN.HEADER_CLASS}`);
		const target = this.getAttribute('href').replace('#', '');

		headerEl.classList.toggle(RAIN.HEADER_HIDDEN_CLASS);
		dialogbox.toggleDialogboxAction(`#${target}`);
	}

	decorateRainDayDetails() {
		const fragment = document.createDocumentFragment();

		this.editionDetails.map((item) => {
			const li = document.createElement('li');
			const spanDay = document.createElement('span');
			const spanRain = document.createElement('span');
			const rain = item.rain ? 'yes' : 'no';

			spanDay.classList.add(RAIN.DETAILS_ITEM_DAY_CLASS);
			spanDay.textContent = item.day;
			spanRain.classList.add(RAIN.DETAILS_ITEM_RAIN_CLASS);
			spanRain.textContent = rain;
			li.classList.add(RAIN.DETAILS_ITEM_CLASS);

			li.appendChild(spanDay);
			li.appendChild(spanRain);
			fragment.appendChild(li);
		});

		return fragment;
	}

	renderRainDetailsLink() {
		const a = document.createElement('a');

		// eslint-disable-next-line max-len
		a.classList.add(LINK.BASIC_CLASS, LINK.INVERTED_STYLE_CLASS, LINK.SIZE_S_CLASS, LINK.HAS_ICON_CLASS, RAIN.DETAILS_LINK_CLASS);
		a.href = `#${RAIN.DETAILS_ID}`;
		a.textContent = 'more';
		a.appendChild(setIcon(icons.plus(), `${LINK.ICON_CLASS}`));
		a.addEventListener('click', this.toggleDetails, null);

		return a;
	}

	renderCloseRainDetails() {
		const a = document.createElement('a');

		a.classList.add(RAIN.CLOSE_DETAILS_CLASS);
		a.href = `#${RAIN.DETAILS_ID}`;
		a.textContent = 'close details';
		a.addEventListener('click', this.toggleDetails, null);

		return a;
	}

	renderRainContainer() {
		const section = document.createElement('section');
		const header = document.createElement('header');
		const rainHeadline = document.createElement('h3');
		const moreLink = this.renderRainDetailsLink();

		section.id = RAIN.SECTION_ID;
		header.classList.add(RAIN.HEADER_CLASS);
		rainHeadline.textContent = 'Rain';
		rainHeadline.classList.add(RAIN.HEADLINE_CLASS);
		header.appendChild(rainHeadline);
		if (this.editionRain) {
			header.appendChild(moreLink);
		}
		section.appendChild(header);

		return section;
	}

	renderRainInfoYes() {
		const fragment = document.createDocumentFragment();
		const svgMask = document.createElementNS(svgType, 'path');
		const videoSettings = {
			classNames: [RAIN.VIDEO_CLASS, RAIN.YES_VIDEO_CLASS],
			src: '/videos/yes-video.webm',
			placeholder: '/images/yes-bg.png',
			width: '426',
			height: '240',
		};
		const maskSettings = {
			svgClass: RAIN.MASK_CLASS,
			maskId: 'rainInfoMask',
			maskShape: svgMask,
		};

		svgMask.classList.add(RAIN.YES_SHAPE_CLASS);
		svgMask.setAttributeNS(null, 'd', 'M56.977-57.755,3.21-149.607H56.977l25.29,46.989,27.415-46.989h53.555L107.345-57.755V-.985H56.977Zm116.886-91.852H283.949V-107.3H224.231v12.97h42.291v38.059H224.231V-43.3h59.718V-.985H173.863ZM314.551-.773q-14.876-2.977-24.227-8.08v-43.8a101.009,101.009,0,0,0,25.184,10.206,99.426,99.426,0,0,0,24.546,3.4q6.376,0,9.138-1.276a4.224,4.224,0,0,0,2.763-4.04q0-3.827-4.25-6.485T329.64-59.668q-20.4-8.93-29.647-19.88t-9.245-26.684a40.37,40.37,0,0,1,7.544-24.132q7.544-10.525,21.252-16.478t31.347-5.953a127.247,127.247,0,0,1,25.715,2.339,93.371,93.371,0,0,1,21.464,7.229v42.311q-19.127-10.631-37.829-10.631-15.089,0-15.089,6.591,0,3.189,3.507,5.316A95.005,95.005,0,0,0,361.306-93.9l7.863,3.189q15.089,6.379,23.165,12.651A36.061,36.061,0,0,1,403.81-63.815q3.4,7.973,3.4,20.093,0,21.475-15.726,33.7T344.092,2.2A150.25,150.25,0,0,1,314.551-.773Z'); // eslint-disable-line max-len

		fragment.appendChild(addVideo(videoSettings));
		fragment.appendChild(addSVGmask(maskSettings));

		return fragment;
	}

	renderRainInfoNo() {
		const fragment = document.createDocumentFragment();
		const svgMask = document.createElementNS(svgType, 'path');
		const videoSettings = {
			classNames: [RAIN.VIDEO_CLASS, RAIN.NO_VIDEO_CLASS],
			src: '/videos/no-video.webm',
			placeholder: '/images/no-bg.png',
			width: '360',
			height: '240',
		};
		const maskSettings = {
			svgClass: RAIN.MASK_CLASS,
			maskId: 'rainInfoMask',
			maskShape: svgMask,
		};

		svgMask.classList.add(RAIN.NO_SHAPE_CLASS);
		svgMask.setAttributeNS(null, 'd', 'M7-139.611H51.447l44.234,69.1v-69.1h48.275V9.011H99.509L55.275-60.3V9.011H7ZM194.25,2.419A73.793,73.793,0,0,1,165.222-24.9q-10.633-17.541-10.633-40.292t10.633-40.4a73.556,73.556,0,0,1,29.029-27.428q18.4-9.781,41.15-9.781,22.542,0,40.938,9.781a73.556,73.556,0,0,1,29.029,27.428Q316-87.944,316-65.194T305.367-24.9A73.792,73.792,0,0,1,276.338,2.419Q257.943,12.2,235.4,12.2,212.646,12.2,194.25,2.419Zm62.2-45.713q8.294-8.08,8.294-21.9t-8.294-21.9q-8.294-8.08-21.054-8.08-12.972,0-21.266,8.08t-8.294,21.9q0,13.82,8.4,21.9t21.16,8.08Q248.16-35.214,256.454-43.294Z'); // eslint-disable-line max-len

		fragment.appendChild(addVideo(videoSettings));
		fragment.appendChild(addSVGmask(maskSettings));

		return fragment;
	}

	selectRainInfo(target) {
		if (this.editionRain === true) {
			target.classList.remove(RAIN.INFO_NO_CLASS);
			target.classList.add(RAIN.INFO_YES_CLASS);
			target.appendChild(this.renderRainInfoYes());
		} else {
			target.classList.remove(RAIN.INFO_YES_CLASS);
			target.classList.add(RAIN.INFO_NO_CLASS);
			target.appendChild(this.renderRainInfoNo());
		}
	}

	renderRainInfo() {
		const div = document.createElement('div');

		div.classList.add(RAIN.INFO_CLASS);
		this.selectRainInfo(div);

		return div;
	}

	updateRainInfo() {
		const rainInfo = document.querySelector(`.${RAIN.INFO_CLASS}`);
		const currentRain = rainInfo.classList.contains(RAIN.INFO_YES_CLASS);
		const newRain = this.editionRain;

		if (currentRain !== newRain) {
			rainInfo.textContent = ''; // to clear rain info container
			this.selectRainInfo(rainInfo);
		}
	}

	updateRainDayDetails() {
		const rainDetailsEl = document.getElementById(RAIN.DETAILS_ID);
		const rainDetailsListEl = document.querySelector(`.${RAIN.DETAILS_LIST_CLASS}`);

		if (rainDetailsEl && this.editionRain) {
			rainDetailsListEl.textContent = ''; // to clear rain details list
			rainDetailsListEl.appendChild(this.decorateRainDayDetails());
		} else if (!rainDetailsEl && this.editionRain) {
			document.querySelector(`.${RAIN.HEADER_CLASS}`).appendChild(this.renderRainDetailsLink());
			document.getElementById(RAIN.SECTION_ID).appendChild(this.renderRainDetails());
		} else {
			document.querySelector(`.${RAIN.HEADER_CLASS}`).classList.remove(RAIN.HEADER_HIDDEN_CLASS);
			document.querySelector(`.${RAIN.DETAILS_LINK_CLASS}`).remove();
			rainDetailsEl.remove();
		}
	}

	renderRainDetails() {
		const ul = document.createElement('ul');
		const rainDetailsDialogbox = dialogbox.addDialogbox({
			id: RAIN.DETAILS_ID,
			classNames: [RAIN.DETAILS_CLASS],
			title: 'Rain',
			content: ul,
			closeAction: this.toggleDetails,
			closeTitle: 'hide rain details',
		});

		ul.classList.add(RAIN.DETAILS_LIST_CLASS);

		ul.appendChild(this.decorateRainDayDetails());

		return rainDetailsDialogbox;
	}

	updateRainDetails() {
		this.updateRainInfo();
		this.updateRainDayDetails();
	}

	render() {
		const fragment = document.createDocumentFragment();
		const rainContainer = this.renderRainContainer();
		const rainInfo = this.renderRainInfo();
		const rainDetails = this.renderRainDetails();

		fragment.appendChild(rainInfo);
		if (this.editionRain) {
			fragment.appendChild(rainDetails);
		}
		rainContainer.appendChild(fragment);

		return rainContainer;
	}
}
