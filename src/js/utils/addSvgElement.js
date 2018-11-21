import setChildren from '../helpers/setChildren';
import setClassName from '../helpers/setClassName';

const svgType = 'http://www.w3.org/2000/svg';

export default function(tag, {
	attrs,
	children,
	classNames,
	id,
} = {}) {
	const svgElement = document.createElementNS(svgType, tag);
	const setAttr = (attr) => {
		const attrName = Object.keys(attr)[0];
		svgElement.setAttributeNS(null, attrName, attr[attrName]);
	};

	setChildren(svgElement, children);
	setClassName(svgElement, classNames);

	if (id) {
		svgElement.id = id;
	}

	if (typeof (attrs) === 'object' && !Array.isArray(attrs)) {
		setAttr(attrs);
	} else if (Array.isArray(attrs)) {
		attrs.forEach((attr) => {
			setAttr(attr);
		});
	}

	return svgElement;
}
