const { connectToDatabase } = require("../db");

const signIn = async (req, res) => {
	const { db } = await connectToDatabase();

	const { username, password } = req.body;

	if(username && password){
		const user = {
			username,
			password
		}
		const result = await db.collection("user").findOne({username});
		
		if(!result){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		if(result.password == password){
			return res.status(200).json({success: true, message: `Welcome ${result.username}.`});
		}

		return res.status(401).json({success: false, message: "Incorrer password."});
	}

	return res.status(500).json({ success: false, message: "Server error"});
}

const signUp = async (req, res) => {
	const { db } = await connectToDatabase();

	const { username, password } = req.body;

	if(username && password){
		const user = {
			username,
			password
		}
		const getUser = await db.collection("user").findOne({username});
		if(getUser){
			return res.status(401).json({success: false, message: "The username is already in use."});
		}
		const result = await db.collection("user").insertOne(user);
		return res.status(200).json({success: true, message: "Good to go."});
	}

	return res.status(500).json({ success: false, message: "Server error"});
}

module.exports = { signIn, signUp };
