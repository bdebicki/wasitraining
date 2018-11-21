import setChildren from '../helpers/setChildren';
import setClassName from '../helpers/setClassName';

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

	setChildren(element, children);
	setClassName(element, classNames);

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
