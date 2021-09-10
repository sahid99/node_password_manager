const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../db");

const addAccount = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, NombreAcc, TarjetaAcc, CodigoAcc, NumeroAcc, DateAcc } = req.body;

    if(username, NombreAcc, TarjetaAcc, CodigoAcc){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }

        const getDocument = await db.collection("documents").findOne({NumeroAcc});
			
		if(getDocument){
			return res.status(401).json({success: false, message: "The document already exists in database."});
        }
        
        const document = {
            username, 
            NombreAcc, 
            TarjetaAcc, 
            CodigoAcc, 
            NumeroAcc, 
            DateAcc
        }

        const resultInsert = await db.collection("accounts").insertOne(document);
        const result = await db.collection("accounts").find({username}).toArray();
		return res.status(200).json(result);

    }

    return res.status(500).json({ success: false, message: "Server error"});

} 

const getAccounts = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username } = req.body;

    if(username){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }
        
        const result = await db.collection("accounts").find({username}).toArray();
		return res.status(200).json(result);

    }

    return res.status(500).json({ success: false, message: "Server error"});

}

const modifyAccount = async (req, res) => {
    const { db } = await connectToDatabase();
	const { username, NombreAcc, TarjetaAcc, CodigoAcc, NumeroAcc, DateAcc, _id } = req.body;
    
    if(username, NombreAcc, TarjetaAcc, CodigoAcc, _id){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }
        
        const getDocument = await db.collection("accounts").findOne({'_id': ObjectId(_id)});
			
		if(!getDocument){
			return res.status(401).json({success: false, message: "The document doesn't exists in database."});
        }

        const document = {
            username, 
            NombreAcc, 
            TarjetaAcc, 
            CodigoAcc, 
            NumeroAcc, 
            DateAcc
        }

        const resultModify = await db.collection("accounts").updateOne( {'_id': ObjectId(_id)}, { $set: document } )
        const result = await db.collection("accounts").find({username}).toArray();
		return res.status(200).json(result);

    }

    return res.status(500).json({ success: false, message: "Server error"});    
    
}

const deleteAccount = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, _id } = req.body;

	if(username && _id){
		const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		const getDocument = await db.collection("accounts").findOne({'_id': ObjectId(_id)});
			
		if(!getDocument){
			return res.status(401).json({success: false, message: "The document doesn't exists in database."});
        } 

		const resultDelete = await db.collection("accounts").findOneAndDelete({'_id': ObjectId(_id)});
        const result = await db.collection("accounts").find({username}).toArray();
		return res.status(200).json(result);
		
	}

	return res.status(500).json({ success: false, message: "Server error"});    
}

module.exports = { addAccount, getAccounts, modifyAccount, deleteAccount };
