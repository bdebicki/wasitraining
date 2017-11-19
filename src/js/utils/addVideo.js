'use strict';

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