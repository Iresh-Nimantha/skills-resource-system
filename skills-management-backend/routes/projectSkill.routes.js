const router = require("express").Router();
const controller = require("../controllers/projectSkill.controller");

router.post("/:projectId/skills", controller.addSkill);

module.exports = router;
