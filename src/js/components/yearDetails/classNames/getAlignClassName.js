import { lineupClassBuilder } from '../elementHandlers/lineup';

export default function(align) {
	if (!align) {
		return null;
	}

	return `${lineupClassBuilder.artist}--${align}Aligned`;
}
