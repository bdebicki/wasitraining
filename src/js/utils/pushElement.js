export default function(target, elements) {
	if (Array.isArray(elements)) {
		elements.forEach((el) => document.querySelector(target).appendChild(el));

		return;
	}

	document.querySelector(target).appendChild(elements);
}
