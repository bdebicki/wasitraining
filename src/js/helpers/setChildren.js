export default function(element, elementChildren) {
	const el = element;
	const children = elementChildren;

	if (typeof (children) === 'string') {
		el.textContent = children;
	} else if (typeof (children) === 'object') {
		if (Array.isArray(children)) {
			children.forEach((childrenEl) => {
				if (typeof (childrenEl) === 'string') {
					el.append(childrenEl);
				} else if (childrenEl && typeof (childrenEl) !== 'string') {
					el.appendChild(childrenEl);
				}
			});
		} else {
			el.appendChild(children);
		}
	}
}
