const db = require("../config/db"); // your MySQL db connection

const PersonnelSkill = {
  // Assign skill to personnel
  assignSkill: async (personnelId, skillId, proficiency) => {
    const [rows] = await db.query(
      `INSERT INTO personnel_skills (personnel_id, skill_id, proficiency)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE proficiency = VALUES(proficiency)`,
      [personnelId, skillId, proficiency]
    );
    return rows;
  },

  // Get all skills assigned to a personnel
  getSkillsByPersonnel: async (personnelId) => {
    const [rows] = await db.query(
      `SELECT ps.id, s.name, ps.proficiency
       FROM personnel_skills ps
       JOIN skills s ON ps.skill_id = s.id
       WHERE ps.personnel_id = ?`,
      [personnelId]
    );
    return rows;
  },

  // Optional: Remove a skill
  removeSkill: async (personnelId, skillId) => {
    const [rows] = await db.query(
      `DELETE FROM personnel_skills WHERE personnel_id = ? AND skill_id = ?`,
      [personnelId, skillId]
    );
    return rows;
  },
};

module.exports = PersonnelSkill;
