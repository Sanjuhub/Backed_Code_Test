const mongoose = require("mongoose");

const empolyeeSchema = require("./empolyeeModel").EmpolyeeSchema;
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      max: 200,
    },
    lastname: {
      type: String,
      required: true,
      max: 200,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    _employeeDetails: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
