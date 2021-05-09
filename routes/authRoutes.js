const router = require("express").Router();
const userAuth = require("../controllers/authController");
const { validateUser } = require("../middlewares/validation");

router.post("/signup", validateUser, userAuth.signup);
router.post("/signin", userAuth.signin);

module.exports = router;
