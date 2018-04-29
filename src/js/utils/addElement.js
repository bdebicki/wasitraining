import { SVG_MASK } from '../enums/elementHandlers';

export const svgType = 'http://www.w3.org/2000/svg';

export function addSVGmask(maskSettings) {
	const settings = maskSettings;
	const { maskId } = settings;
	const fragment = document.createDocumentFragment();
	const svg = document.createElementNS(svgType, 'svg');
	const defs = document.createElementNS(svgType, 'defs');
	const mask = document.createElementNS(svgType, 'mask');
	const rectMask = document.createElementNS(svgType, 'rect');
	const rectBg = document.createElementNS(svgType, 'rect');

	svg.classList.add(SVG_MASK.MASK_CLASS);
	if (settings.svgClass) {
		svg.classList.add(settings.svgClass);
	}
	mask.id = maskId;
	mask.setAttributeNS(null, 'maskUnits', 'userSpaceOnUse');
	rectMask.classList.add(SVG_MASK.MASK_BASE_CLASS);
	rectBg.classList.add(SVG_MASK.MASK_BG_CLASS);
	if (settings.maskBgClass) {
		rectBg.classList.add(settings.maskBgClass);
	}
	rectBg.setAttributeNS(null, 'mask', `url(#${maskId})`);

	mask.appendChild(rectMask);
	mask.appendChild(settings.maskShape);
	defs.appendChild(mask);
	svg.appendChild(defs);
	svg.appendChild(rectBg);
	fragment.appendChild(svg);

	return fragment;
}

export function addVideo(videoSettings) {
	const settings = videoSettings;
	const video = document.createElement('video');

	if (Array.isArray(settings.classNames)) {
		settings.classNames.map((className) => video.classList.add(className));
	} else {
		video.classList.add(settings.classNames);
	}
	video.setAttribute('src', settings.src);
	video.setAttribute('poster', settings.placeholder);
	video.width = settings.width;
	video.height = settings.height;
	video.setAttribute('autoplay', '');
	video.setAttribute('loop', '');

	return video;
}
