export default function({
	classNames,
	src,
	placeholder,
	width,
	height,
}) {
	const video = document.createElement('video');

	if (Array.isArray(classNames)) {
		classNames.forEach((className) => video.classList.add(className));
	} else {
		video.classList.add(classNames);
	}
	video.setAttribute('src', src);
	video.setAttribute('poster', placeholder);
	video.width = width;
	video.height = height;
	video.setAttribute('autoplay', '');
	video.setAttribute('loop', '');

	return video;
}
