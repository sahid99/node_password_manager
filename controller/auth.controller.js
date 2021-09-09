const { connectToDatabase } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}


const signIn = async (req, res) => {
	const { db } = await connectToDatabase();

	const { username, password } = req.body;

	if(username && password){

		const result = await db.collection("user").findOne({username});
		
		if(!result){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		if(bcrypt.compare(password, result.password)){
			const token =  jwt.sign({username}, secret, {
				expiresIn: 60 * 45
			})
			return res.status(200).json({success: true, message: `Welcome ${result.username}.`, token});
		}

		return res.status(401).json({success: false, message: "Incorrect password."});
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

        user.password = await encryptPassword(password);

		const token =  jwt.sign({username}, secret, {
			expiresIn: 60 * 45
		})

		const result = await db.collection("user").insertOne(user);
		return res.status(200).json({success: true, message: "Good to go.", token});
	}

	return res.status(500).json({ success: false, message: "Server error"});
}

const session = async (req, res) => {

	const { db } = await connectToDatabase();

	const { username } = req.body;

	if(username){
		const result = await db.collection("user").findOne({username});
		
		if(!result){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		return res.status(200).json({success: true, message: "The username exists", result});
	}

	return res.status(500).json({ success: false, message: "Server error"});
} 

module.exports = { signIn, signUp, session };
