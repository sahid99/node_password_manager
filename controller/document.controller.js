const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../db");

const addDocument = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, NombreDoc, TipoDoc, NumeroDoc, PersonaDoc, NotasAcc } = req.body;

    if(username, NombreDoc, TipoDoc, NumeroDoc){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }

        const getDocument = await db.collection("documents").findOne({NumeroDoc});
			
		if(getDocument){
			return res.status(401).json({success: false, message: "The document already exists in database."});
        }
        
        const document = {
            username, 
            NombreDoc, 
            TipoDoc, 
            NumeroDoc, 
            PersonaDoc, 
            NotasAcc
        }

        const resultInsert = await db.collection("documents").insertOne(document);
        const result = await db.collection("documents").find({username}).toArray();
		return res.status(200).json(result);

    }

    return res.status(500).json({ success: false, message: "Server error"});

} 

const getDocuments = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username } = req.body;

    if(username){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }
        
        const result = await db.collection("documents").find({username}).toArray();
		return res.status(200).json(result);

    }

    return res.status(500).json({ success: false, message: "Server error"});

}

const modifyDocument = async (req, res) => {
    const { db } = await connectToDatabase();
	const { username, NombreDoc, TipoDoc, NumeroDoc, PersonaDoc, NotasAcc, _id } = req.body;
    
    if(username, NombreDoc, TipoDoc, NumeroDoc, _id){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }
        
        const getDocument = await db.collection("documents").findOne({'_id': ObjectId(_id)});
			
		if(!getDocument){
			return res.status(401).json({success: false, message: "The document doesn't exists in database."});
        }

        const document = {
            username, 
            NombreDoc, 
            TipoDoc, 
            NumeroDoc, 
            PersonaDoc, 
            NotasAcc
        }

        const resultModify = await db.collection("documents").updateOne( {'_id': ObjectId(_id)}, { $set: document } )
        const result = await db.collection("documents").find({username}).toArray();
		return res.status(200).json(result);

    }

    return res.status(500).json({ success: false, message: "Server error"});    
    
}

const deleteDocument = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, _id } = req.body;

	if(username && _id){
		const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
		}

		const getDocument = await db.collection("documents").findOne({'_id': ObjectId(_id)});
			
		if(!getDocument){
			return res.status(401).json({success: false, message: "The document doesn't exists in database."});
        } 

		const resultDelete = await db.collection("documents").findOneAndDelete({'_id': ObjectId(_id)});
        const result = await db.collection("documents").find({username}).toArray();
		return res.status(200).json(result);
		
	}

	return res.status(500).json({ success: false, message: "Server error"});    
}

module.exports = { addDocument, getDocuments, modifyDocument, deleteDocument };
