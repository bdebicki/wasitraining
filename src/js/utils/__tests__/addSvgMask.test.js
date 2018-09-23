import { addSVGmask, svgType } from '../addSvgMask';
import using from '../../../../tests/utils/using';

function getMaskShape() {
	const shape = document.createElementNS(svgType, 'text');
	shape.textContent = '2018';

	return shape;
}

const svgMaskCases = [
	{
		description: 'render svg mask with additional classes dor svg and mackBg',
		settings: {
			svgClass: 'mainTimelineItemMask',
			maskId: 'yearMask2018',
			maskShape: getMaskShape(),
			maskBgClass: 'mainTimelineItemMask__bg',
		},
	},
	{
		description: 'render svg mask without addidional classes',
		settings: {
			maskId: 'yearMask2018',
			maskShape: getMaskShape(),
		},
	},
];

describe('render svg element', () => {
	using(svgMaskCases).describe('', ({ description, settings }) => {
		it(description, () => {
			const svgEl = addSVGmask(settings);

			expect(svgEl).toMatchSnapshot();
		});
	});
});
