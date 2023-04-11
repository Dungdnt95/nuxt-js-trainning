import { check } from "express-validator";
import sql from "../models/db";

const signupValidation = [
  check("name", "Name is requied").not().isEmpty(),
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];

const loginValidation = [
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];
const checkRequest = (req, res) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res(
      {
        message: "Please provide the token",
      },
      null
    );
  }
  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, "the-super-strong-secrect");
  sql.query(
    `SELECT * FROM users where id= ${sql.escape(decoded.id)};`,
    (err, result) => {
      if (err) {
        return res({ message: "Error" }, null);
      }
      return res(null, {
        error: false,
        data: results[0],
        message: "Fetch Successfully.",
      });
    }
  );
};

export { signupValidation, loginValidation, checkRequest };
