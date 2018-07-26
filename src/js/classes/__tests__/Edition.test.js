import editionData, { details } from '../../../../__mocks__/edition.json';
import editionOneDay from '../../../../__mocks__/editionOneDay.json';
import editionWithoutRain from '../../../../__mocks__/editionWithoutRain.json';
import Edition from '../Edition';

const mockedEdition = new Edition(editionData);

describe('test returns data from edition class', () => {
	it('return edition id', () => {
		// when
		const id = mockedEdition.editionId;

		// then
		expect(id).toBe(16);
	});
	it('return edition year', () => {
		// when
		const year = mockedEdition.editionYear;

		// then
		expect(year).toBe('2017');
	});
	it('return full edition name', () => {
		// when
		const fullName = mockedEdition.editionFullName;

		// then
		expect(fullName).toBe('Open\'er Festival powered by Orange');
	});
	it('return edition place', () => {
		// when
		const place = mockedEdition.editionPlace;

		// then
		expect(place).toBe('Babie Doły Airport, Gdynia');
	});
	it('return edition details', () => {
		// when
		const det = mockedEdition.editionDetails;

		// then
		expect(det).toEqual(details);
	});
	it('return edition length', () => {
		// when
		const length = mockedEdition.editionLength;

		// then
		expect(length).toBe(4);
	});
	it('return edition date (multiple days)', () => {
		// when
		const date = mockedEdition.editionDate;

		// then
		expect(date).toEqual({ firstDay: '28th June', lastDay: '1st July' });
	});
	it('return edition date (one day)', () => {
		// when
		const oneDayEdition = new Edition(editionOneDay);
		const date = oneDayEdition.editionDate;

		// then
		expect(date).toBe('2nd July');
	});
	it('return edition rain information (true)', () => {
		// when
		const rain = mockedEdition.editionRain;

		// then
		expect(rain).toBeTruthy();
	});
	it('return edition rain information (false)', () => {
		// when
		const sunnyEdition = new Edition(editionWithoutRain);
		const date = sunnyEdition.editionRain;

		// then
		expect(date).toBeFalsy();
	});
});
