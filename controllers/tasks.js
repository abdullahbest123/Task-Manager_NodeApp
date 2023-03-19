const Taask = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Taask.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Taask.findOne({ _id: taskID });
  if (!task) {
    const test = createCustomError(`No task with name ${taskID}`, 404);
    return next(test);
  }

  res.status(200).json({ task });
});
const createTask = asyncWrapper(async (req, res) => {
  const taask = await Taask.create(req.body);
  res.status(201).json({ taask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Taask.findOneAndDelete({ _id: taskID });
  if (!task) return next(createCustomError(`No task with name ${taskID}`, 404));

  res.status(200).send({ task: null, status: "sucess" });
});
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const data = req.body;
  const task = await Taask.findOneAndUpdate(
    { _id: taskID },

    { $set: data },
    { useFindAndModify: false, new: true, runValidators: true }
  );
  if (!task) return next(createCustomError(`No task with name ${taskID}`, 404));

  res.status(200).send({ id: taskID, task: data });
});
module.exports = { getAllTask, deleteTask, createTask, updateTask, getTask };
