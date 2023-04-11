import { UserModel } from "../models/user.model.js";
import { signupValidation, loginValidation, checkRequest } from "./verify.js";
const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  UserModel.register(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

const findUser = (req, res) => {
  UserModel.login(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Login failed",
      });
    else res.send(data);
  });
};

export const users = {
  findUser,
  create,
};
