import DATA_URL from './enums/data';
import IntroView from './views/IntroView';
// import YearView from './views/YearView';
import '../less/app.less';

function app() {
	fetch(DATA_URL)
		.then((response) => response.json())
		.then((data) => {
			const intro = new IntroView(data);

			intro.render();
			// const year = new YearView(data, 16);
			//
			// year.render();
		})
		.catch((error) => {
			console.log(error); // eslint-disable-line no-console
		});
}
app();
