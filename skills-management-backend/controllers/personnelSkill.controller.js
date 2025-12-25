const PersonnelSkill = require("../models/personnelSkill.model");

exports.assignSkills = async (req, res) => {
  try {
    const { personnelid, skillid, proficiency } = req.body;
    if (!personnelid || !skillid || !proficiency)
      return res.status(400).json({ message: "Missing required fields" });

    await PersonnelSkill.assignSkill(personnelid, skillid, proficiency);
    res.json({ message: "Skill assigned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPersonnelSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const skills = await PersonnelSkill.getSkillsByPersonnel(id);
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeSkill = async (req, res) => {
  try {
    const { personnelId, skillId } = req.body;
    await PersonnelSkill.removeSkill(personnelId, skillId);
    res.json({ message: "Skill removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Bulk assign multiple skills
exports.assignMultipleSkills = async (req, res) => {
  try {
    const { personnelId, skills } = req.body;
    // skills = [{ skillId, proficiency }, ...]
    if (!personnelId || !Array.isArray(skills) || skills.length === 0)
      return res.status(400).json({ message: "Missing required fields" });

    for (const skill of skills) {
      if (!skill.skillId || !skill.proficiency) continue;
      await PersonnelSkill.assignSkill(
        personnelId,
        skill.skillId,
        skill.proficiency
      );
    }

    res.json({ message: "Skills assigned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
