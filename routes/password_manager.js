const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const { addPassword, getPasswords, modifyPassword, deletePassword } = require("../controller/passwords.controller");

router.post("/getPasswords", verifyToken, getPasswords);
router.post("/addPassword", verifyToken, addPassword);
router.post("/modifyPassword", verifyToken, modifyPassword);
router.post("/deletePassword", verifyToken, deletePassword);
// router.post("/generatePassword", {});

module.exports = router;


