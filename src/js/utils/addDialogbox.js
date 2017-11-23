'use strict';
import { DIALOGBOX } from '../enums/elementHandlers';

export function addDialogbox(dialogboxSettings) {
	const settings = dialogboxSettings;
	let div = document.createElement('div');
	let header = document.createElement('header');
	let h3 = document.createElement('h3');
	let closeBtn = document.createElement('a');

	div.classList.add(DIALOGBOX.BASIC_CLASS, settings.classNames);
	div.id = settings.id;
	closeBtn.classList.add(DIALOGBOX.CLOSE_CLASS);
	closeBtn.textContent = 'close';
	closeBtn.addEventListener('click', settings.closeAction, null);
	h3.textContent = settings.title;
	h3.classList.add(DIALOGBOX.HEADLINE_CLASS);
	header.classList.add(DIALOGBOX.HEADER_CLASS);
	header.appendChild(h3);
	header.appendChild(closeBtn);
	div.appendChild(header);
	div.appendChild(settings.content);

	return div;
}