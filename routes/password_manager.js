const { Router } = require("express");
const router = Router();

const { addPassword, getPasswords, modifyPassword } = require("../controller/passwords.controller");

router.post("/getPasswords", getPasswords);
router.post("/addPassword", addPassword);
router.post("/modifyPassword", modifyPassword);
// router.post("/deletePassword", {});
// router.post("/generatePassword", {});

module.exports = router;


