const express = require('express');
const User = require('../Models/User');

const router = express.Router();

// UPDATE BEST SCORE
const updateScore = async (req, res) => {
  try {
    const { wpm, accuracy } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updated = false;

    // update WPM if better
    if (wpm > user.bestWPM) {
      user.bestWPM = wpm;
      updated = true;
    }

    // update accuracy if better
    if (accuracy > user.bestAccuracy) {
      user.bestAccuracy = accuracy;
      updated = true;
    }

    if (updated) {
      await user.save();
    }

    res.json({
      message: "Score processed",
      bestWPM: user.bestWPM,
      bestAccuracy: user.bestAccuracy
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const getBestScore = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      bestWPM: user.bestWPM,
      bestAccuracy: user.bestAccuracy
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching score" });
  }
};


module.exports = {
  updateScore,
  getBestScore
};