const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const { checkToken } = require("../../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
