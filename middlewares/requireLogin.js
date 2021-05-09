const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const userModel = require("../models/userModel");

exports.requireLogin = [
  async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const jwtUser = jwt.verify(token, keys.JWT_SECRET);
      const user = await userModel.findOne({ email: jwtUser.email });
      if (!user)
        return res.status(404).send({ messge: "Authorization error!" });
    } catch (err) {
      return res.status(401).send({
        message: err.message || "Not authorize to access this resource!",
      });
    }
    next();
  },
];
