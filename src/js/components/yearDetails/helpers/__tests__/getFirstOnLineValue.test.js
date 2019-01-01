import { firstOnLineArray, firstOnLineHeadliners, firstOnLineLineup } from '../../../../../../tests/__mocks__/artists';
import getFirstOnLineValue from '../getFirstOnLineValue';

describe('tests for getFirstOnLineValue helper', () => {
	const lineValue = 'lineup';

	it('return true from string key value', () => {
		expect(getFirstOnLineValue(firstOnLineLineup, lineValue)).toBeTruthy();
	});
	it('return true from array key value', () => {
		expect(getFirstOnLineValue(firstOnLineArray, lineValue)).toBeTruthy();
	});
	it('return false when line value is different', () => {
		expect(getFirstOnLineValue(firstOnLineHeadliners, lineValue)).toBeFalsy();
	});
});
