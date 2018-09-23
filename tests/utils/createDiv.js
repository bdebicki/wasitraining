export default function(className) {
	const divEl = document.createElement('div');

	divEl.classList.add(className);

	return divEl;
}
