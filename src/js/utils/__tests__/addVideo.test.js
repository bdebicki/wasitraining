import using from '../../../../testUtils/using';
import addVideo from '../addVideo';

const videoElCases = [
	{
		description: 'with one class name',
		classNames: 'bgVideo',
	},
	{
		description: 'with multiple class names',
		classNames: ['bgVideo', 'videoFullScreen'],
	},
];

describe('render video element', () => {
	using(videoElCases).describe('', ({ description, classNames }) => {
		it(description, () => {
			const videoEl = addVideo({
				classNames,
				src: './video.webm',
				placeholder: './placeholder.png',
				width: 200,
				height: 100,
			});

			expect(videoEl).toMatchSnapshot();
		});
	});
});
