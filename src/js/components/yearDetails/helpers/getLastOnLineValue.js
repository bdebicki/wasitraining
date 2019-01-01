import { ARTIST_KEYS } from '../../../enums/artist';

export default function(artistObj, lineValue) {
	if (Array.isArray(artistObj[ARTIST_KEYS.LAST_ON_LINE])) {
		return artistObj[ARTIST_KEYS.LAST_ON_LINE].includes(lineValue);
	}

	return artistObj[ARTIST_KEYS.LAST_ON_LINE] === lineValue;
}
