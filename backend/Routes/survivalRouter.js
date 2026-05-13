const router = require('express').Router();
const {userCheck} = require("../Middleware/userCheck");
const { updateSurvivalTime, getBestSurvivalTime, getLeaderboard } = require("../Controllers/survivalController");

router.post("/update", userCheck, updateSurvivalTime);
router.get("/best", userCheck, getBestSurvivalTime);
router.get("/leaderboard", userCheck, getLeaderboard);

module.exports = router;