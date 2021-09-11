const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const { addAccount, getAccounts, modifyAccount, deleteAccount } = require("../controller/account.controller");

router.post("/getAccounts", verifyToken, getAccounts);
router.post("/addAccount", verifyToken, addAccount);
router.post("/modifyAccount", verifyToken, modifyAccount);
router.post("/deleteAccount", verifyToken, deleteAccount);

module.exports = router;
