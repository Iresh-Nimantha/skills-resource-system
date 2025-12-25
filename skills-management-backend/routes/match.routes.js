const router = require("express").Router();
const controller = require("../controllers/match.controller");

// router.get("/:projectId", controller.matchProject);
router.get("/:projectId/match", controller.matchProject);

module.exports = router;
