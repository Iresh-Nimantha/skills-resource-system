// models/personnelSkill.model.js
const db = require("../config/db");

exports.assign = (data, cb) => {
  const sql = `
    INSERT INTO personnel_skills (personnel_id, skill_id, proficiency)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [data.personnel_id, data.skill_id, data.proficiency], cb);
};
