const db = require("../config/db");

const levelMap = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
};

exports.matchProject = (req, res) => {
  const projectId = req.params.projectId;

  const query = `
  SELECT p.id, p.name, p.role, s.name AS skill, ps.proficiency, prs.min_level
  FROM personnel p
  JOIN personnel_skills ps ON p.id = ps.personnel_id
  JOIN skills s ON ps.skill_id = s.id
  JOIN project_skills prs ON s.id = prs.skill_id
  WHERE prs.project_id = ?
  `;

  db.query(query, [projectId], (err, rows) => {
    if (err) return res.status(500).json(err);

    const people = {};

    rows.forEach((r) => {
      if (!people[r.id])
        people[r.id] = { name: r.name, role: r.role, ok: true, skills: [] };

      if (levelMap[r.proficiency] < levelMap[r.min_level]) {
        people[r.id].ok = false;
      }

      people[r.id].skills.push({
        skill: r.skill,
        level: r.proficiency,
      });
    });

    const result = Object.values(people).filter((p) => p.ok);
    res.json(result);
  });
};
