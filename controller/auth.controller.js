// const connection = require("")


// connection


const signIn = (req, res) => {

	const { username, password } = req.body;

	if(username && password){

	}

	res.status(500).json({ message: "Server error"});
}

module.exports = { signIn };
