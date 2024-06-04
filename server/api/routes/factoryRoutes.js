const express = require("express");
const router = express.Router();
const factoryController = require("../controllers/factoryControler");

router.get("/", factoryController.getAllFactories);
router.get("/:name", factoryController.getFactoryByName);
router.post("/", factoryController.createFactory);
router.put("/:name", factoryController.updateFactory);
router.delete("/:name", factoryController.deleteFactory);

module.exports = router;
