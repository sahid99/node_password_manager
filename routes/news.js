const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const { getNoticias } = require("../controller/news.controller");

router.get("/getNoticias", verifyToken, getNoticias);
// router.post("/deleteDocument", {});

module.exports = router;
