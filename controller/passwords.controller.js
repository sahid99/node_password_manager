const { connectToDatabase } = require("../db");
const { ObjectId } = require("mongodb")

const addPassword = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, Nombre, Carpeta, URL, Usernamepass, Contrasena, Notas } = req.body;
   
	if(username && Nombre && Contrasena){
		const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		const passwordObj = {
			username,
			Nombre, 
			Carpeta, 
			URL, 
			Usernamepass, 
			Contrasena, 
			Notas
		}

		const resultInsert = await db.collection("password_manager").insertOne(passwordObj);
		
		const result = await db.collection("password_manager").find({username}).toArray();

		return res.status(200).json(result);
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

		return res.status(200).json(result);
	}

	return res.status(500).json({ success: false, message: "Server error"});

}

const modifyPassword = async (req, res) => {
    const { db } = await connectToDatabase();
	const { username, Nombre, Carpeta, URL, Usernamepass, Contrasena, Notas, _id } = req.body;
    
    if(username && Nombre && Carpeta && URL){
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
			Nombre, 
			Carpeta, 
			URL, 
			Usernamepass, 
			Contrasena, 
			Notas
		}

        const resultUpdate = await db.collection("password_manager").updateOne( {'_id': ObjectId(_id)}, { $set: passwordObj } )
        const result = await db.collection("password_manager").find({username}).toArray();

		return res.status(200).json(result);

    }

    return res.status(500).json({ success: false, message: "Server error"});    
    
}

const deletePassword = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, _id } = req.body;

	if(username && _id){
		const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		const getPassword = await db.collection("password_manager").findOne({'_id': ObjectId(_id)});
			
		if(!getPassword){
			return res.status(401).json({success: false, message: "The password doesn't exists in database."});
        } 

		const resultDelete = await db.collection("password_manager").findOneAndDelete({'_id': ObjectId(_id)});

        const result = await db.collection("password_manager").find({username}).toArray();

		return res.status(200).json(result);
		
	}

	return res.status(500).json({ success: false, message: "Server error"});    
}

module.exports = {addPassword, getPasswords, modifyPassword, deletePassword};