const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../db");

const addDocument = async (req, res) => {
	const { db } = await connectToDatabase();
	const { username, type, curp, docId } = req.body;

    if(username, type, curp, docId){
        const getUser = await db.collection("user").findOne({username});
			
		if(!getUser){
			return res.status(401).json({success: false, message: "The username doesn't exists in database."});
        }

        const getDocument = await db.collection("documents").findOne({docId});
			
		if(getDocument){
			return res.status(401).json({success: false, message: "The document already exists in database."});
        }
        
        const document = {
            username, 
            type,
            curp,
            docId
        }

        const result = await db.collection("documents").insertOne(document);
		return res.status(200).json({success: true, message: "The document was stored."});

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
		return res.status(200).json({success: true, result});

    }

    return res.status(500).json({ success: false, message: "Server error"});

}

const modifyDocument = async (req, res) => {
    const { db } = await connectToDatabase();
	const { username, type, curp, docId, _id } = req.body;
    
    if(username, type, curp, docId, _id){
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
            type,
            curp,
            docId,
        }

        const result = await db.collection("documents").updateOne( {'_id': ObjectId(_id)}, { $set: document } )
        return res.status(200).json({success: true, message: "The document was stored."});

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

		const result = await db.collection("documents").findOneAndDelete({'_id': ObjectId(_id)});

        return res.status(200).json({success: true, message: "The documents was deleted."});
		
	}

	return res.status(500).json({ success: false, message: "Server error"});    
}

module.exports = { addDocument, getDocuments, modifyDocument, deleteDocument };
