const { getAllTexts, getTextById, getRandomText } = require("../Controllers/textController");
const router = require('express').Router();

router.get("/texts", getAllTexts);
router.get("/texts/random", getRandomText);
router.get("/texts/:id", getTextById);

module.exports = router;