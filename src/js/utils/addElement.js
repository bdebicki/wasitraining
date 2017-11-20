'use strict';
import { SVG_MASK } from '../enums/elementHandlers';

export const svgType = 'http://www.w3.org/2000/svg';

export function addSVGmask(maskSettings) {
	const settings = maskSettings;
	const maskId = settings.maskId;
	let fragment = document.createDocumentFragment();
	let svg = document.createElementNS(svgType, 'svg');
	let defs = document.createElementNS(svgType, 'defs');
	let mask = document.createElementNS(svgType, 'mask');
	let rectMask = document.createElementNS(svgType, 'rect');
	let rectBg = document.createElementNS(svgType, 'rect');

	svg.classList.add(SVG_MASK.MASK_CLASS, settings.svgClass);
	mask.id = maskId;
	mask.setAttributeNS(null, 'maskUnits', 'userSpaceOnUse');
	rectMask.classList.add(SVG_MASK.MASK_BASE_CLASS);
	rectBg.classList.add(SVG_MASK.MASK_BG_CLASS, settings.maskBgClass);
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
	let video = document.createElement('video');

	video.classList.add(settings.className);
	video.setAttribute('src', settings.src);
	video.setAttribute('poster', settings.placeholder);
	video.width = settings.width;
	video.height = settings.height;
	video.setAttribute('autoplay', '');
	video.setAttribute('loop', '');

	return video;
}