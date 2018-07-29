export default function() {
	const html = document.querySelector('html');
	const body = document.querySelector('body');

	while (html.attributes.length > 0) { html.removeAttribute(html.attributes[0].name); }
	while (body.attributes.length > 0) { body.removeAttribute(body.attributes[0].name); }
	while (body.firstChild) { body.removeChild(body.firstChild); }
}
