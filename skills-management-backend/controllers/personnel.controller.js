const Personnel = require("../models/personnel.model");

exports.getAll = async (req, res) => {
  try {
    const personnel = await Personnel.findAll();
    res.json(personnel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const person = await Personnel.findById(req.params.id);
    if (!person)
      return res.status(404).json({ message: "Personnel not found" });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await Personnel.create(req.body);
    res.status(201).json({ message: "Personnel created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Personnel.update(req.params.id, req.body);
    res.json({ message: "Personnel updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Personnel.delete(req.params.id);
    res.json({ message: "Personnel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
