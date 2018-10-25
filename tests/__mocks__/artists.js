export const artistString = 'Pearl Jam';
export const artistObject = { artist: 'Pearl Jam' };
export const artistDisplayName = { artist: 'Fisz Emade Jako Tworzywo Sztuczne', displayName: 'Fisz Emade' };

export const canceled = {
	artist: 'Kendrick Lamar',
	canceled: true,
};
export const canceledWithReplacement = [
	{
		artist: 'The Dumplings',
		canceled: true,
	},
	{
		artist: 'Domowe Melodie',
		replacement: 'The Dumplings',
	},
];

export const slice = {
	artist: 'The Kills',
	sliceDecorator: {
		slice: 'The',
		style: 'up',
	},
};
export const multipleSlice = {
	artist: 'Zbigniew Wodeski with Mitch & Mitch Orchestra and Choir',
	sliceDecorator: [
		{
			slice: 'with',
			style: 'down',
		},
		{
			slice: 'Orchestra and Choir',
			style: 'multiline',
		},
	],
};
export const multipleSliceStyles = {
	artist: 'Jonny Greenwood',
	sliceDecorator: {
		slice: 'Greenwood',
		style: [
			'newLine',
			'indented',
		],
	},
};
export const sliceWithoutStyles = {
	artist: 'Manu Chao Radio Bemba Sound System',
	sliceDecorator: {
		slice: 'Radio Bemba Sound System',
	},
};

export const firstOnLine = { artist: 'Swans', firstOnLine: true };
export const lastOnLine = { artist: 'Sigur Rós', lastOnLine: true };
export const lastOnDay = { artist: 'Plum', lastOnDay: true };
export const newLine = {
	artist: 'Teatr Snów: przedstawienie Republika Marzeń',
	newLine: true,
};
export const twoLines = [
	'Bokka',
	{
		artist: 'Pink Freud Plays Autechre',
		breakLine: true,
		sliceDecorator: {
			slice: 'Pink Freud',
			style: 'previousLine',
		},
	},
];
export const turnedOffSeparator = { artist: 'Prince', skipSeparator: true };

export const aligned = {
	artist: 'Steve Reich & Ensemble Modern',
	aligned: 'right',
};
export const decorator = {
	artist: 'The Prodigy',
	decorator: 'promoted',
};
export const multipleDecorator = {
	artist: 'Youssou N’Dour',
	decorator: [
		'expanded',
		'wordExpandHeavy',
	],
};
export const marked = {
	artist: 'Drake',
	marked: true,
};
export const multiline = {
	artist: 'Penderecki//Greenwood',
	multiline: true,
};
