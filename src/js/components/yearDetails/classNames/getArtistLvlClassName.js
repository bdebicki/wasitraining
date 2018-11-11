import LINEUP_LEVELS from '../../../enums/lineupLevels';
import { LINEUP } from '../elementHandlers/lineup';

export default function(lvl) {
	if (lvl === LINEUP_LEVELS.HEADLINERS) {
		return `${LINEUP.ARTIST_CLASS}--headliner`;
	}

	return `${LINEUP.ARTIST_CLASS}--${lvl}`;
}
