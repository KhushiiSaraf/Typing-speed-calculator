const { getAIFeedback } = require("../Controllers/aiController");
const router = require('express').Router();


router.post("/ai-feedback", getAIFeedback);

module.exports = router;