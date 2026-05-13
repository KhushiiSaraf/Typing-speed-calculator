const router = require('express').Router();
const {userCheck} = require("../Middleware/userCheck");
const { updateScore, getBestScore } = require("../Controllers/scoreController");


router.post("/update", userCheck, updateScore);
router.get("/best", userCheck, getBestScore);

module.exports = router;