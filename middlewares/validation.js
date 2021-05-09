const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("firstname")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("First Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),

  check("lastname")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Last Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),

  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be more that 6 charecters"),

  check("employeeId")
    .not()
    .isEmpty()
    .withMessage("EmployeeId cannot be empty")
    .isLength({ min: 3, max: 16 })
    .withMessage(
      "EmployeeId must be more that 3 digits and less than 16 digits"
    ),

  check("orgName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Organisation Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
