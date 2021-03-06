import svgType from '../../constants/svgType';
import addSvgElement from '../addSvgElement';
import using from '../../../../tests/utils/using';

const svgElementCases = [
	{
		description: 'with nested element',
		tag: 'svg',
		settings: {
			children: document.createElementNS(svgType, 'rect'),
		},
	},
	{
		description: 'with class name',
		tag: 'svg',
		settings: {
			classNames: 'svgElementClassName',
		},
	},
	{
		description: 'with id',
		tag: 'svg',
		settings: {
			id: 'svgElementId',
		},
	},
	{
		description: 'svg attribute',
		tag: 'path',
		settings: {
			properties: { d: 'M56.977-57.755,3.21-149.607H56.977l25.29,46.989,27.415-46.989h53.555L107.345-57.755V-.985H56.977Zm116.886-91.852H283.949V-107.3H224.231v12.97h42.291v38.059H224.231V-43.3h59.718V-.985H173.863ZM314.551-.773q-14.876-2.977-24.227-8.08v-43.8a101.009,101.009,0,0,0,25.184,10.206,99.426,99.426,0,0,0,24.546,3.4q6.376,0,9.138-1.276a4.224,4.224,0,0,0,2.763-4.04q0-3.827-4.25-6.485T329.64-59.668q-20.4-8.93-29.647-19.88t-9.245-26.684a40.37,40.37,0,0,1,7.544-24.132q7.544-10.525,21.252-16.478t31.347-5.953a127.247,127.247,0,0,1,25.715,2.339,93.371,93.371,0,0,1,21.464,7.229v42.311q-19.127-10.631-37.829-10.631-15.089,0-15.089,6.591,0,3.189,3.507,5.316A95.005,95.005,0,0,0,361.306-93.9l7.863,3.189q15.089,6.379,23.165,12.651A36.061,36.061,0,0,1,403.81-63.815q3.4,7.973,3.4,20.093,0,21.475-15.726,33.7T344.092,2.2A150.25,150.25,0,0,1,314.551-.773Z' }, // eslint-disable-line max-len
		},
	},
	{
		description: 'multiple svg attributes',
		tag: 'rect',
		settings: {
			properties: [
				{ width: '12' },
				{ height: '2' },
			],
		},
	},
];

describe('tests for addSvgElement function', () => {
	using(svgElementCases).describe('renders html svg element', ({ description, tag, settings }) => {
		it(description, () => {
			expect(addSvgElement(tag, settings)).toMatchSnapshot();
		});
	});
});
