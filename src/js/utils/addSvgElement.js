import svgType from '../constants/svgType';
import setChildren from '../helpers/setChildren';
import setClassName from '../helpers/setClassName';

export default function(tag, {
	children,
	classNames,
	defs,
	id,
	maskId,
	properties,
} = {}) {
	const svgElement = document.createElementNS(svgType, tag);
	const setProperties = (props) => {
		const attrName = Object.keys(props)[0];
		svgElement.setAttributeNS(null, attrName, props[attrName]);
	};

	setChildren(svgElement, children);
	setClassName(svgElement, classNames);

	if (defs) {
		const defsContainer = document.createElementNS(svgType, 'defs');

		if (Array.isArray(defs)) {
			defs.forEach((def) => defsContainer.appendChild(def));
		} else {
			defsContainer.appendChild(defs);
		}

		svgElement.prepend(defsContainer);
	}

	if (id) {
		svgElement.id = id;
	}

	if (maskId) {
		svgElement.setAttributeNS(null, 'mask', `url(#${maskId})`);
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
