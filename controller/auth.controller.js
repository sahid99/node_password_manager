const { connectToDatabase } = require("../db");

const signIn = async (req, res) => {
	const { db } = await connectToDatabase();

	const { username, password } = req.body;

	if(username && password){
		const user = {
			username,
			password
		}
		const result = await db.collection("password_manager").insertOne(user);
		res.status(200).json(result);
	}

	res.status(500).json({ message: "Server error"});
}

module.exports = { signIn };
