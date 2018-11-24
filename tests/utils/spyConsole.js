// https://github.com/facebook/react/issues/7047
export default function() {
	const spy = {};

	beforeAll(() => {
		spy.console = jest.spyOn(console, 'error').mockImplementation(() => {});
		spy.console = jest.spyOn(console, 'log').mockImplementation(() => {});
	});
	afterAll(() => {
		spy.console.mockRestore();
	});

	return spy;
}
