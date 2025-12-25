const router = require("express").Router();
const controller = require("../controllers/project.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

// Project match route
router.get("/:id/match", controller.matchProject);

module.exports = router;
