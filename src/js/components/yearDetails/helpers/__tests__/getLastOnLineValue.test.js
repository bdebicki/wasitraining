import { lastOnLineArray, lastOnLineHeadliners, lastOnLineLineup } from '../../../../../../tests/__mocks__/artists';
import getLastOnLineValue from '../getLastOnLineValue';

describe('tests for getLastOnLineValue helper', () => {
	const lineValue = 'lineup';

	it('return true from string key value', () => {
		expect(getLastOnLineValue(lastOnLineLineup, lineValue)).toBeTruthy();
	});
	it('return true from array key value', () => {
		expect(getLastOnLineValue(lastOnLineArray, lineValue)).toBeTruthy();
	});
	it('return false when line value is different', () => {
		expect(getLastOnLineValue(lastOnLineHeadliners, lineValue)).toBeFalsy();
	});
});
