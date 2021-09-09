const { connectToDatabase } = require("../db");
const { ObjectId } = require("mongodb")

const addPassword = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, password, site } = req.body;
   
	if(username && password && site){
		const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		const passwordObj = {
			username,
			password, 
			site
		}

		const result = await db.collection("password_manager").insertOne(passwordObj);
		return res.status(200).json({success: true, message: "The password was stored."});
   }

   return res.status(500).json({ success: false, message: "Server error"});

}

const getPasswords = async (req, res) => {
	const { db } = await connectToDatabase();

	const { username } = req.body;

	if(username){
		const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}
		
		const result = await db.collection("password_manager").find({username}).toArray();

		return res.status(200).json({success: true, result});
	}

	return res.status(500).json({ success: false, message: "Server error"});

}

const modifyPassword = async (req, res) => {
    const { db } = await connectToDatabase();
	const { username, password, site, _id } = req.body;
    
    if(username && password && site && _id){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }
		
		const getPassword = await db.collection("password_manager").findOne({'_id': ObjectId(_id)});
			
		if(!getPassword){
			return res.status(401).json({success: false, message: "The password doesn't exists in database."});
        }

        const passwordObj = {
			username,
			password, 
			site
		}

        const result = await db.collection("password_manager").updateOne( {'_id': ObjectId(_id)}, { $set: passwordObj } )
        return res.status(200).json({success: true, message: "The pasword was updated."});

    }

    return res.status(500).json({ success: false, message: "Server error"});    
    
}

module.exports = {addPassword, getPasswords, modifyPassword};