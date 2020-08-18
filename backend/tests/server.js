const request = require("postman-request");

function serverTest() {
	const options = {
		url: "http://localhost:3000/api/v1/tasks/s",
		auth: {
			'bearer': 's'
		}
	};

	function callback(error, response, body) {
		if (response.statusCode === 200) {
			console.log("GET api/v1/tasks/{{TaskId}}  200 OK");
			return true;
		} else {
			console.log(response.statusCode);
			return false;
		}
	}
	request(options, callback);
}

module.exports = {
	serverTest,
};
