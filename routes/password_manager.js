const { Router } = require("express");
const router = Router();

const { addPassword, getPasswords } = require("../controller/passwords.controller");

router.post("/addPassword", addPassword);
router.post("/getPasswords", getPasswords);

module.exports = router;


