import {serverTest} from "./server";

class TestSuite {
	constructor(appInit: {tests: any}) {
		this.test(appInit.tests);
	}

	public test(tests: {forEach: (arg0: (test: any) => any) => any}) {
		tests.forEach(test => {
			test()
				.then(function (f: boolean) {
					return f;
				})
				.catch(function (err: any) {
					console.log(err);
				});
		});
	}
}

const testSuite = new TestSuite({
	tests: [serverTest],
});
