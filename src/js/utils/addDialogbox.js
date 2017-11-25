'use strict';
import { DIALOGBOX, LINK } from '../enums/elementHandlers';
import { setIcon } from './setIcon';
import { icons } from './iconsLibrary';

export function addDialogbox(dialogboxSettings) {
	const settings = dialogboxSettings;
	let div = document.createElement('div');
	let header = document.createElement('header');
	let h3 = document.createElement('h3');
	let closeBtn = document.createElement('a');

	div.classList.add(DIALOGBOX.BASIC_CLASS);
	div.id = settings.id;
	if (settings.classNames) {
		div.classList.add(settings.classNames);
	}
	closeBtn.classList.add(DIALOGBOX.CLOSE_CLASS);
	closeBtn.appendChild(setIcon(icons.close(), `${LINK.ICON_CLASS}`));
	closeBtn.setAttribute('href', settings.id);
	closeBtn.addEventListener('click', settings.closeAction, null);
	if (settings.closeTitle) {
		closeBtn.title = settings.closeTitle;
	} else {
		closeBtn.title = 'hide details';
	}
	h3.textContent = settings.title;
	h3.classList.add(DIALOGBOX.HEADLINE_CLASS);
	header.classList.add(DIALOGBOX.HEADER_CLASS);

	header.appendChild(h3);
	header.appendChild(closeBtn);
	div.appendChild(header);
	div.appendChild(settings.content);

	return div;
}