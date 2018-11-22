import setChildren from '../helpers/setChildren';
import setClassName from '../helpers/setClassName';

const svgType = 'http://www.w3.org/2000/svg';

export default function(tag, {
	children,
	classNames,
	id,
	properties,
} = {}) {
	const svgElement = document.createElementNS(svgType, tag);
	const setProperties = (props) => {
		const attrName = Object.keys(props)[0];
		svgElement.setAttributeNS(null, attrName, props[attrName]);
	};

	setChildren(svgElement, children);
	setClassName(svgElement, classNames);

	if (id) {
		svgElement.id = id;
	}

	if (typeof (properties) === 'object' && !Array.isArray(properties)) {
		setProperties(properties);
	} else if (Array.isArray(properties)) {
		properties.forEach((property) => {
			setProperties(property);
		});
	}

	return svgElement;
}
