export default function(element, elementClassNames) {
	const el = element;
	const classNames = elementClassNames;

	if (typeof (classNames) === 'string') {
		el.classList.add(classNames);
	} else if (Array.isArray(classNames)) {
		classNames.forEach((className) => {
			if (className) {
				el.classList.add(className);
			}
		});
	}
}
