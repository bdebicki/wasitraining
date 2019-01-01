import { editionClassBuilders } from '../elementHandlers/edition';
import { lineupClassBuilder } from '../elementHandlers/lineup';
import { ARTIST_ON_LINE_VALUES } from '../../../enums/artist';

const blockToBuilderMap = {
	[ARTIST_ON_LINE_VALUES.LINEUP]: lineupClassBuilder.artist,
	[ARTIST_ON_LINE_VALUES.HEADLINERS]: editionClassBuilders.headliner,
};

function prepareClassName(modifierName, blockName) {
	return `${blockToBuilderMap[blockName]}--${modifierName}`;
}

export default function(decorator, blockName = ARTIST_ON_LINE_VALUES.LINEUP) {
	if (!decorator) {
		return null;
	}

	if (Array.isArray(decorator)) {
		return decorator.map((decoratorType) => prepareClassName(decoratorType, blockName));
	}

	return prepareClassName(decorator, blockName);
}
