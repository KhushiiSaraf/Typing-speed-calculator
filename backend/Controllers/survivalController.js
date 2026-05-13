const express = require('express');
const User = require('../Models/User');

const router = express.Router();

// UPDATE BEST SURVIVAL TIME
const updateSurvivalTime = async (req, res) => {
  try {
    const { survivalTime } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (survivalTime > user.bestSurvivalTime) {
      user.bestSurvivalTime = survivalTime;
      await user.save();
    } 
    res.json({
      message: "Survival time processed",
      bestSurvivalTime: user.bestSurvivalTime
    });
    } catch (err) {
    res.status(500).json({ message: "Server error" });
    }
};

// GET BEST SURVIVAL TIME
const getBestSurvivalTime = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      bestSurvivalTime: user.bestSurvivalTime
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching survival time" });
  } 
};

// GET LEADERBOARD
const getLeaderboard = async (req, res) => {

    try {

        const users = await User.find({
            bestSurvivalTime: { $gt: 0 }
        })

        .sort({ bestSurvivalTime: -1 })

        .limit(10)

        .select("name bestSurvivalTime");

        res.json(users);

    } catch(err){

        res.status(500).json({
            message: "Error fetching leaderboard"
        });
    }
};

module.exports = {
    updateSurvivalTime,
    getBestSurvivalTime,
    getLeaderboard
};