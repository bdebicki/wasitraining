import { lineupClassBuilder } from '../../elementHandlers/lineup';

export default function(modifier) {
	if (!modifier) {
		return null;
	}

	return `${lineupClassBuilder.artist}--${modifier}`;
}
