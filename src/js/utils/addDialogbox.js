'use strict';
import { DIALOGBOX, LINK } from '../enums/elementHandlers';
import { setIcon } from './setIcon';
import { icons } from './iconsLibrary';

export function addDialogbox({id, classNames, closeAction = toggleDialogbox, closeTitle = 'hide details', title, content} = {}) {
	let div = document.createElement('div');
	let header = document.createElement('header');
	let h3 = document.createElement('h3');
	let closeBtn = document.createElement('a');

	const dialogboxId = id;
	const dialogboxClassNames = [DIALOGBOX.BASIC_CLASS];

	classNames.map((item) => {
		dialogboxClassNames.push(item);
	});

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

export function toggleDialogboxAction(target) {
	document.querySelector(target).classList.toggle(DIALOGBOX.VISIBLE_CLASS);
}