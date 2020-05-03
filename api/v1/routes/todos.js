const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Todo = require("../models/todos");

router.post("/", (req, res, next) => {
    Todo.find()
        .select("_id title inserted_at inserted_by")
        .exec()
        .then((result) => {
            res.status(200).json({
                todos: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({
                error: err,
            });
        });
});

router.post("/add-todo", (req, res, next) => {
    const { title, remarks, assigned_to } = req.body;
    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        title,
        remarks,
        assigned_to,
    });

    todo.save()
        .then((result) => {
            console.log(result);

            res.status(200).json({
                todo,
                message: "Successfully created todo",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json(err);
        });
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Todo.findById(id)
        .exec()
        .then((data) => {
            console.log(data);

            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);

            res.status(200).json({
                error: "No record found",
            });
        });
});

module.exports = router;
