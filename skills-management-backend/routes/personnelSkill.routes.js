const express = require("express");
const router = express.Router();
const controller = require("../controllers/personnelSkill.controller");

// Assign multiple skills to personnel
router.post("/bulk-assign", controller.assignMultipleSkills);

// Get all skills assigned to personnel
router.get("/:id/skills", controller.getPersonnelSkills);

// Remove a skill (optional)
router.delete("/skills", controller.removeSkill);

module.exports = router;
