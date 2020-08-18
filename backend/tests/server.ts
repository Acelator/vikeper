const axios = require("axios").default;

export async function serverTest() {
	const req = await axios
		.get("http://localhost:3000/api/v1/tasks/s")
		.then(function (response: any) {
			return response;
		})
		.catch(function (err: any) {
			console.log(err);
		});

	if (req) {
		if (req.status === 200) {
			const f = true;
			return f;
		} else if (req.status !== 200) {
			return false;
		}
	} else {
		console.log("Server couldn't be reached");
		return false;
	}
}
