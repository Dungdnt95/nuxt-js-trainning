import sql from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = (data, res) => {
  sql.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(data.email)});`,
    (err, result) => {
      if (err) {
        res(err, null);
        return;
      }
      if (result.length) {
        res({ message: "This user is already in use!" }, null);
        return;
      } else {
        bcrypt.hash(data.password, 10, (err, hash) => {
          if (err) {
            res(err, null);
            return;
          } else {
            sql.query(
              `INSERT INTO users (name, email, password) VALUES ('${
                data.name
              }', ${db.escape(data.email)}, ${sql.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  res(err, null);
                  return;
                }
                result(null, { msg: "The user has been registerd with us!" });
              }
            );
          }
        });
      }
    }
  );
};

const login = (data, res) => {
  sql.query(
    `SELECT * FROM users WHERE email = ${sql.escape(data.email)};`,
    (err, result) => {
      if (err) {
        res(err, null);
        return;
      }
      if (!result.length) {
        res({ message: "Email or password is incorrect!" }, null);
        return;
      }
      bcrypt.compare(data.password, result[0]["password"], (bErr, bResult) => {
        if (bErr) {
          res({ message: "Email or password is incorrect!" }, null);
          return;
        }
        if (bResult) {
          const token = jwt.sign(
            { id: result[0].id },
            "the-super-strong-secrect",
            { expiresIn: "1h" }
          );
          sql.query(
            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
          );
          result(null, {
            msg: "Logged in!",
            token,
            user: result[0],
          });
          return;
        }
        res({ message: "Email or password is incorrect!" }, null);
        return;
      });
    }
  );
};
export const UserModel = { login, register };
