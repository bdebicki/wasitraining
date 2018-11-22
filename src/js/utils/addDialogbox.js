import DIALOGBOX from './elementHandlers/dialogbox';
import LINK from '../elementHandlers/link';
import addElement from './addElement';
import setIcon from './setIcon';
import icons from '../helpers/iconsLibrary';

export function addDialogbox({
	id,
	classNames,
	stretched = false,
	dataAttr,
	closeAction = toggleDialogbox,
	closeTitle = 'hide details',
	title,
	content,
} = {}) {
	const dialogboxId = id;
	const dialogboxClassNames = [DIALOGBOX.BASIC_CLASS];

	if (classNames) {
		classNames.forEach((className) => dialogboxClassNames.push(className));
	}
	if (stretched) {
		dialogboxClassNames.push(DIALOGBOX.STRETCHED_CLASS);
	}

	const h3 = addElement('h3', {
		children: title,
		classNames: DIALOGBOX.HEADLINE_CLASS,
	});
	const closeBtn = addElement('a', {
		children: setIcon(icons.close(), `${LINK.ICON_CLASS}`),
		classNames: DIALOGBOX.CLOSE_CLASS,
		href: dialogboxId,
		onClick: closeAction,
		title: closeTitle,
	});
	const header = addElement('header', {
		classNames: DIALOGBOX.HEADER_CLASS,
		children: [
			h3,
			closeBtn,
		],
	});
	const div = addElement('div', {
		classNames: dialogboxClassNames,
		dataAttr,
		id: dialogboxId,
		children: [
			header,
			content,
		],
	});

	return div;
}

export function toggleDialogbox(e) {
	e.preventDefault();
	toggleDialogboxAction(`.${DIALOGBOX.VISIBLE_CLASS}`);
}

export function toggleDialogboxWithInactive(e) {
	e.preventDefault();
	toggleDialogboxAction(`.${DIALOGBOX.VISIBLE_CLASS}`, `.${DIALOGBOX.INACTIVE_HELPER_CLASS}`);
}

export function toggleDialogboxAction(target, inactiveElement) {
	document.querySelector(target).classList.toggle(DIALOGBOX.VISIBLE_CLASS);

	if (inactiveElement) {
		document.querySelector(inactiveElement).classList.toggle(DIALOGBOX.INACTIVE_HELPER_CLASS);
	}
}
