const User = require("../models/userModel");
const Emp = require("../models/empolyeeModel");

async function getUserList(req, res, next) {
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  const sort = {};
  const search = {};

  if (req.query.sortBy) {
    const sortquery = req.query.sortBy.split(":");
    sort[sortquery[0]] = sortquery[1] === "dsc" ? -1 : 1;
  }

  if (req.query.searchBy) {
    const searchquery = req.query.searchBy.split(":");
    search[searchquery[0]] = searchquery[1];
  }

  User.find(search)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .populate({ path: "_employeeDetails", match: {} })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while getting list",
      });
    });
}

module.exports = {
  getUserList,
};
