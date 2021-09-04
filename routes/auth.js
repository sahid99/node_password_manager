const { Router } = require("express");
const router = Router();
const { signIn, signUp } = require("../controller/auth.controller");

router.post("/signin", signIn);
router.post("/signUp", signUp);

module.exports = router;