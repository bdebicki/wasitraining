import addElement from './addElement';

export default function({
	classNames,
	src,
	placeholder,
	width,
	height,
}) {
	const video = addElement('video', { classNames });

	video.setAttribute('src', src);
	video.setAttribute('poster', placeholder);
	video.width = width;
	video.height = height;
	video.setAttribute('autoplay', '');
	video.setAttribute('loop', '');

	return video;
}
