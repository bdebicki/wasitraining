import edition2004 from '../__mocks__/edition-notSort-customLevels.json';
import edition2005 from '../__mocks__/edition-customOrderExceptHeadliners-mainByDaysAndMergeRest.json';
import editionsData from '../__mocks__/editions.json';

export default function() {
	const editions = editionsData;

	editions.splice(2, 1, edition2004);
	editions.splice(3, 0, edition2005);

	return editions;
}
