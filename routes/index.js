const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.json({"title":"Sahid's API.", "message":"Hello from Sahid's API!!"});
});


module.exports = router;