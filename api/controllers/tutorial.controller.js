import {TutorialModel} from "../models/tutorial.model.js";

const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  };

  TutorialModel.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

const findAll = (req, res) => {
  const title = req.query.title;

  TutorialModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

const findAllPublished = (req, res) => {
  TutorialModel.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

const findOne = (req, res) => {
  TutorialModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

const updateItem = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  TutorialModel.updateById(
    req.params.id,
    new TutorialModel.Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

const deleteItem = (req, res) => {
  TutorialModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id,
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

const deleteAll = (req, res) => {
  TutorialModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};

export const tutorials = {
  deleteAll,
  deleteItem,
  updateItem,
  findOne,
  findAllPublished,
  findAll,
  create,
};
