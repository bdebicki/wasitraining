import addSvgElement from './addSvgElement';
import { ICONS } from './elementHandlers/icons';

const icons = {
	plus: () => {
		const icon = document.createDocumentFragment();
		const width = 5;
		const height = 5;
		const className = ICONS.PLUS;
		const rectH = addSvgElement('rect', {
			attrs: [
				{ x: '0' },
				{ y: '2' },
				{ width: '5' },
				{ height: '1' },
			],
		});
		const rectV = addSvgElement('rect', {
			attrs: [
				{ x: '2' },
				{ y: '0' },
				{ width: '1' },
				{ height: '5' },
			],
		});

		icon.appendChild(rectH);
		icon.appendChild(rectV);

		return {
			icon, width, height, className,
		};
	},

	close: () => {
		const icon = document.createDocumentFragment();
		const width = 10;
		const height = 10;
		const className = ICONS.CLOSE;
		const rectH = addSvgElement('rect', {
			classNames: ICONS.CLOSE_RECT,
			attrs: [
				{ x: '-1' },
				{ y: '4' },
				{ width: '12' },
				{ height: '2' },
			],
		});
		const rectV = addSvgElement('rect', {
			classNames: ICONS.CLOSE_RECT,
			attrs: [
				{ x: '4' },
				{ y: '-1' },
				{ width: '2' },
				{ height: '12' },
			],
		});

		icon.appendChild(rectH);
		icon.appendChild(rectV);

		return {
			icon, width, height, className,
		};
	},
};

export { icons as default };
