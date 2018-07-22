import DIALOGBOX from './elementHandlers/dialogbox';
import LINK from '../elementHandlers/link';
import setIcon from './setIcon';
import icons from './iconsLibrary';

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
	const div = document.createElement('div');
	const header = document.createElement('header');
	const h3 = document.createElement('h3');
	const closeBtn = document.createElement('a');
	const dialogboxId = id;
	const dialogboxClassNames = [DIALOGBOX.BASIC_CLASS];

	if (classNames) {
		classNames.forEach((className) => dialogboxClassNames.push(className));
	}
	if (stretched) {
		dialogboxClassNames.push(DIALOGBOX.STRETCHED_CLASS);
	}
	if (dataAttr) {
		dataAttr.forEach((data) => {
			const dataName = data[0];
			const dataValue = data[1];

			div.dataset[dataName] = dataValue;
		});
	}

	div.id = dialogboxId;
	div.classList.add(...dialogboxClassNames);
	closeBtn.classList.add(DIALOGBOX.CLOSE_CLASS);
	closeBtn.appendChild(setIcon(icons.close(), `${LINK.ICON_CLASS}`));
	closeBtn.setAttribute('href', dialogboxId);
	closeBtn.addEventListener('click', closeAction, null);
	closeBtn.title = closeTitle;
	header.classList.add(DIALOGBOX.HEADER_CLASS);
	h3.classList.add(DIALOGBOX.HEADLINE_CLASS);
	h3.textContent = title;

	header.appendChild(h3);
	header.appendChild(closeBtn);
	div.appendChild(header);
	div.appendChild(content);

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
