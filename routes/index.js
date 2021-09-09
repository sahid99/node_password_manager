const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.json({"title":"Password Manager API.", "message":"Hello from Password Manager API!!"});
});


module.exports = router;