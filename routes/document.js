const { Router } = require("express");
const router = Router();

const { addDocument, getDocuments, modifyDocument } = require("../controller/document.controller");

router.post("/getDocuments", getDocuments);
router.post("/addDocument", addDocument);
router.post("/modifyDocument", modifyDocument);
// router.post("/deleteDocument", {});

module.exports = router;
