const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const { addDocument, getDocuments, modifyDocument } = require("../controller/document.controller");

router.post("/getDocuments", verifyToken, getDocuments);
router.post("/addDocument", verifyToken, addDocument);
router.post("/modifyDocument", verifyToken, modifyDocument);
// router.post("/deleteDocument", {});

module.exports = router;
