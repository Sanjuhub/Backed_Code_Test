const mongose = require("mongoose");

const EmpolyeeSchema = new mongose.Schema({
  employeeId: {
    type: Number,
    required: true,
    unique: true,
  },
  organisationName: {
    type: String,
    required: true,
    max: 200,
  },
});

module.exports = mongose.model("Employee", EmpolyeeSchema);
