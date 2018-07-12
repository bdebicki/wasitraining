import { lineupClassBuilder } from '../../elementHandlers/lineup';

export default function(decorator) {
	if (!decorator) {
		return null;
	}

	return `${lineupClassBuilder.artist}--${decorator}`;
}
