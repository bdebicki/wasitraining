/* global describe */

class Using {
	constructor(cases) {
		this.cases = cases;
	}

	describe(description, callback) {
		describe(description, () => {
			this.cases.forEach((item) => {
				callback(item);
			});
		});
	}
}

export default function using(cases) {
	return new Using(cases);
}
