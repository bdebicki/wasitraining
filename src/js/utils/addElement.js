export default function(tag, {
	classNames,
	id,
	data,
	children,
}) {
	const element = document.createElement(tag);
	const setData = (dataAttr) => {
		const dataName = Object.keys(dataAttr)[0];
		element.dataset[dataName] = dataAttr[dataName];
	};

	if (typeof (classNames) === 'string') {
		element.classList.add(classNames);
	} else if (Array.isArray(classNames)) {
		classNames.forEach((className) => element.classList.add(className));
	}

	if (id) {
		element.id = id;
	}

	if (typeof (data) === 'object' && !Array.isArray(data)) {
		setData(data);
	} else if (Array.isArray(data)) {
		data.forEach((dataAttr) => {
			setData(dataAttr);
		});
	}

	if (typeof (children) === 'string') {
		element.textContent = children;
	} else if (typeof (children) === 'object') {
		element.appendChild(children);
	}

	return element;
}
