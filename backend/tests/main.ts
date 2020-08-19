import fs from "fs"

// Import tests
import {getServer} from "./server";

class TestSuite {
	// Gets the current date with the format <yyyyMMddHHmmss>
	private date = new Date();
	private time = `${this.date.getFullYear()}$${this.date.getMonth()}${this.date.getDay()}${this.date.getHours()}${this.date.getMinutes()}${this.date.getSeconds()}`
	private logFileName: any = this.time.replace("$", "0");

	constructor(appInit: {tests: any}) {
		this.test(appInit.tests);
		this.log();
	}

	// TODO: SAVE RESPONSE TO A FILE
	private test(tests: {forEach: (arg0: (test: any) => any) => any}) {
		tests.forEach(test => {
			test()
				.then(function (response: any) {
					console.log(response);
				})
				.catch(function (err: any) {
					console.log(err);
				});
		});
	}

	// TODO: PRINTS THE TESTS RESULTS
	private log(): void {
		console.log(this.logFileName);
	}
}

// Create a new instance of the App
new TestSuite({
	tests: [getServer],
});
