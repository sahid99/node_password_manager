const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const { addDocument, getDocuments, modifyDocument, deleteDocument } = require("../controller/document.controller");

router.post("/getDocuments", verifyToken, getDocuments);
router.post("/addDocument", verifyToken, addDocument);
router.post("/modifyDocument", verifyToken, modifyDocument);
router.post("/deleteDocument", verifyToken, deleteDocument);

module.exports = router;
