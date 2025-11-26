// routes/admin.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");
const Department = require("../models/Department");
const Screen = require("../models/Screen");

// CREATE DEPARTMENT
router.post("/department", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Only admin allowed" });

  const dep = new Department({ name: req.body.name });
  await dep.save();
  res.json(dep);
});

// CREATE SCREEN
router.post("/screen", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Only admin allowed" });

  const screen = new Screen({
    screenName: req.body.screenName,
    permissions: req.body.permissions // <-- include permissions
  });

  await screen.save();
  res.json(screen);
});

// GET ALL SCREENS
router.get("/screens", auth, async (req, res) => {
  const screens = await Screen.find();
  res.json(screens);
});

// ASSIGN DEPARTMENT TO USER
router.post("/assign-department", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Only admin allowed" });

  const { userId, departmentId } = req.body;

  await User.findByIdAndUpdate(userId, { department: departmentId });

  res.json({ msg: "Department assigned" });
});

// ASSIGN SCREENS TO USER
router.post("/assign-screens", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Only admin allowed" });

  const { userId, screens } = req.body; // array of screen IDs

  await User.findByIdAndUpdate(userId, { screens });

  res.json({ msg: "Screens Updated" });
});

// ✅ REQUIRED EXPORT
module.exports = router;
