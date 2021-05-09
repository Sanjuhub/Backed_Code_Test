const router = require("express").Router();
const userApi = require("../controllers/userController");
const { requireLogin } = require("../middlewares/requireLogin");

router.get("/getuserlist", requireLogin, userApi.getUserList);

module.exports = router;
