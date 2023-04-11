import {tutorials}  from "../controllers/tutorial.controller.js";
import express from 'express';
const router = express.Router();

router.post("/", tutorials.create);
router.get("/", tutorials.findAll);
router.get("/published", tutorials.findAllPublished);
router.get("/:id", tutorials.findOne);
router.put("/:id", tutorials.updateItem);
router.delete("/:id", tutorials.deleteItem);
router.delete("/", tutorials.deleteAll);

export default router;
