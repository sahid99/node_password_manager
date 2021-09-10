const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const { addAccount, getAccounts, modifyAccount, deleteAccount } = require("../controller/account.controller");

router.post("/getAccounts", verifyToken, addAccount);
router.post("/addAccount", verifyToken, getAccounts);
router.post("/modifyAccount", verifyToken, modifyAccount);
router.post("/deleteAccount", verifyToken, deleteAccount);

module.exports = router;
