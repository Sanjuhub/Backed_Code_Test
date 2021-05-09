const User = require("../models/userModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const UserEmpolyee = require("../models/empolyeeModel");

async function signup(req, res, next) {
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).send({ error: "Email already exist." });
  }
  const salt = await bycrypt.genSalt(10);
  hashpassword = await bycrypt.hash(req.body.password, salt);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashpassword,
  });

  const userEmp = new UserEmpolyee({
    employeeId: req.body.employeeId,
    organisationName: req.body.orgName,
  });

  try {
    const userSignup = await user.save();
    const emp = await userEmp.save();

    await User.findByIdAndUpdate(
      userSignup._id,
      {
        _employeeDetails: emp._id,
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ message: err.message || "Update db failure" });
        } else {
          console.log("Update success");
        }
      }
    );

    console.log(userSignup);
    const payload = {
      user: {
        id: userSignup.id,
        email: userSignup.email,
      },
    };

    jwt.sign(payload, "anystring", { expiresIn: 10000 }, (err, token) => {
      if (err) {
        res.send(err);
      }

      res.status(200).send({
        token,
        userSignup,
      });
    });
  } catch (err) {
    return res.status(400).send({ err });
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid Email/Password" });
  }
  if (await bycrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      keys.JWT_SECRET
    );
    return res.json({ status: "ok", data: token });
  }
}

module.exports = {
  signup,
  signin,
};
