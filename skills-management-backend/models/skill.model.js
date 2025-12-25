const db = require("../config/db");

// Create skill
exports.create = async (skill) => {
  try {
    const [result] = await db.query(
      "INSERT INTO skills (name, category, description) VALUES (?, ?, ?)",
      [skill.name, skill.category, skill.description]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

// Get all skills
exports.findAll = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM skills");
    return rows;
  } catch (err) {
    throw err;
  }
};

// Update skill
exports.update = async (id, skill) => {
  try {
    const [result] = await db.query(
      "UPDATE skills SET name=?, category=?, description=? WHERE id=?",
      [skill.name, skill.category, skill.description, id]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete skill
exports.delete = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM skills WHERE id=?", [id]);
    return result;
  } catch (err) {
    throw err;
  }
};
