const { connectToDatabase } = require("../db");

const signIn = async (req, res) => {
	const { db } = await connectToDatabase();

	const { username, password } = req.body;

	if(username && password){
		const user = {
			username,
			password
		}
		const result = await db.collection("password_manager").findOne({username});
		
		if(result.password == password){
			return res.status(200).json({success: true});
		}

		return res.status(401).json({success: false});
	}

	return res.status(500).json({ message: "Server error"});
}

const signUp = async (req, res) => {
	const { db } = await connectToDatabase();

	const { username, password } = req.body;

	if(username && password){
		const user = {
			username,
			password
		}
		const result = await db.collection("password_manager").insertOne(user);
		return res.status(200).json(result);
	}

	return res.status(500).json({ message: "Server error"});
}

module.exports = { signIn, signUp };
