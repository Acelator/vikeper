const axios = require("axios").default;

export async function getServer() {
	const response = {
		number: 1,
		it: "Tests that the server is running",
		description: "Basic GET request to the base api URL",
		testInfo: {
			serverPath: "",
			statusText: "",
			statusCode: "",
			expectedStatusCode: "",
		},
		testPassed: "",
	};
	const url: string = "http://localhost:3000";
	const serverPath: string = "/api/v1/tasks/s";
	const req = await axios
		.get(`${url}${serverPath}`)
		.then(function (response: any) {
			return response;
		})
		.catch(function (err: any) {
			console.log(err);
		});

	if (req) {
		if (req.status === 200) {
			// Creates the response object
			response.testInfo.serverPath = serverPath;
			response.testInfo.statusCode = req.status;
			response.testInfo.statusText = req.statusText;
			response.testInfo.expectedStatusCode = "200";
			response.testPassed = "true";

			return response;
		} else if (req.status !== 200) {
			return false;
		}
	} else {
		console.log("Server couldn't be reached");
		return false;
	}
}
