const { Router } = require("express");
const router = Router();
const { signIn } = require("../controller/auth.controller");

router.get("/signin", signIn);

module.exports = router;