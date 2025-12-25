const db = require("../config/db");

// Get all projects
exports.findAll = async () => {
  const [rows] = await db.query(
    "SELECT id, name, description, start_date, end_date, status, created_at FROM projects"
  );
  return rows;
};

// Get project by ID
exports.findById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name, description, start_date, end_date, status, created_at FROM projects WHERE id = ?",
    [id]
  );
  return rows[0];
};

// Create a project
exports.create = async (project) => {
  const [result] = await db.query(
    `INSERT INTO projects 
    (name, description, start_date, end_date, status) 
    VALUES (?, ?, ?, ?, ?)`,
    [
      project.name,
      project.description,
      project.start_date,
      project.end_date,
      project.status,
    ]
  );
  return result;
};

// Update a project
exports.update = async (id, project) => {
  const [result] = await db.query(
    `UPDATE projects 
     SET name = ?, description = ?, start_date = ?, end_date = ?, status = ? 
     WHERE id = ?`,
    [
      project.name,
      project.description,
      project.start_date,
      project.end_date,
      project.status,
      id,
    ]
  );
  return result;
};

// Delete a project
exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM projects WHERE id = ?", [id]);
  return result;
};
