const db = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM personnel");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM personnel WHERE id = ?", [id]);
  return rows[0];
};

exports.create = async (person) => {
  const [result] = await db.query(
    "INSERT INTO personnel (name, email, role, experience_level) VALUES (?, ?, ?, ?)",
    [person.name, person.email, person.role, person.experience_level]
  );
  return result;
};

exports.update = async (id, person) => {
  const [result] = await db.query(
    "UPDATE personnel SET name = ?, email = ?, role = ?, experience_level = ? WHERE id = ?",
    [person.name, person.email, person.role, person.experience_level, id]
  );
  return result;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM personnel WHERE id = ?", [id]);
  return result;
};
