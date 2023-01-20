const TaskCollection = require("../db/schema/task");

async function createTask(taskObject) {
  let error = null;
  const task = await TaskCollection.create(taskObject).catch((err) => {
    console.error("Error creating the task: ", err);
    error = err;
  });

  return { task, error };
}

async function updateTask(projectId, taskObject) {
  const { taskId, title, description } = taskObject;

  let error = null;
  const task = await TaskCollection.findOne({
    _id: taskId,
    projectId: projectId,
  }).catch((err) => {
    console.error("Error getting the task: ", err);
    error = err.message;
  });

  if (!task) {
    error = "Task cannot be found.";
    return { task: null, error };
  }

  // update task
  task.title = title;
  task.description = description;

  await task.save().catch((err) => {
    console.error("Error saving the task: ", err);
    error = err.message;
  });

  return { task, error };
}

async function getTaskAnalytics(projectId) {
  let error = null;
  const task = await TaskCollection.create(taskObject).catch((err) => {
    console.error("Error creating the task: ", err);
    error = err;
  });

  return { task, error };
}

module.exports = {
  createTask,
  updateTask,
};
