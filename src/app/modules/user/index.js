const express = require('express');
const router = express();

const userController = require("./user.controller");
const controller = new userController();

router.get("/", controller.getAllUsers);
router.post("/create",controller.createUser);
router.post("/uploadImage", controller.uploadImage);

module.exports = router;