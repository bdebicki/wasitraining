/* eslint-disable complexity */
export default function(tag, {
	children,
	classNames,
	dataAttr,
	id,
	href,
	onClick,
	title,
} = {}) {
	const element = document.createElement(tag);
	const setData = (data) => {
		const dataName = Object.keys(data)[0];
		element.dataset[dataName] = data[dataName];
	};

	if (typeof (classNames) === 'string') {
		element.classList.add(classNames);
	} else if (Array.isArray(classNames)) {
		classNames.forEach((className) => {
			if (className) {
				element.classList.add(className);
			}
		});
	}

	if (id) {
		element.id = id;
	}

	if (typeof (dataAttr) === 'object' && !Array.isArray(dataAttr)) {
		setData(dataAttr);
	} else if (Array.isArray(dataAttr)) {
		dataAttr.forEach((attr) => {
			setData(attr);
		});
	}

	if (typeof (children) === 'string') {
		element.textContent = children;
	} else if (typeof (children) === 'object') {
		if (Array.isArray(children)) {
			children.forEach((childrenEl) => {
				if (typeof (childrenEl) === 'string') {
					element.append(childrenEl);
				} else if (childrenEl && typeof (childrenEl) !== 'string') {
					element.appendChild(childrenEl);
				}
			});
		} else {
			element.appendChild(children);
		}
	}

	if (title) {
		element.title = title;
	}

	if (href) {
		element.setAttribute('href', href);
	}

	if (onClick) {
		element.addEventListener('click', onClick, null);
	}

	return element;
}
/* eslint-enable complexity */
