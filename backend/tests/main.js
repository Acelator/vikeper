// Import tests
const server = require("./server");

// Obtain tests functions
const serverTest = server.serverTest;

class TestSuite {
	constructor() {
		this.log()
	}

	log() {
		console.log("log");
	}
}

serverTest();
