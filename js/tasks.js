import { get, patch, post } from "./api.js";

const user = JSON.parse(window.localStorage.getItem("user"));

const userId = user.id;

async function fetchTasks(deleted) {
  const tasks = await get(`/tasks?userId=${userId}&deleted=${deleted}`);
  return tasks;
}

async function createTask(title, description, priority, dueDate) {
  const newTask = {
    userId: String(user.id),
    title,
    description,
    status: "pending",
    priority,
    dueDate,
    deleted: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return await post("/tasks", newTask);
}

async function deleteTask(taskId) {
  const softDelete = await patch(`/tasks/${taskId}`, {
    deleted: true,
    deletedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return softDelete;
}

async function updateTaskStatus(taskId, status) {
  const newPatch = await patch(`/tasks/${taskId}`, {
    status,
    updatedAt: new Date().toISOString(),
  });
  return newPatch;
}

async function updateTask(taskId, title, description, priority, dueDate) {
  const updatedTask = await patch(`/tasks/${taskId}`, {
    title,
    description,
    priority,
    dueDate,
    updatedAt: new Date().toISOString(),
  });
  return updatedTask;
}

async function restoreTask(taskId) {
  const restoredTask = await patch(`/tasks/${taskId}`, {
    deleted: false,
    deletedAt: null,
    updatedAt: new Date().toISOString(),
  });

  return restoredTask;
}

export {
  createTask,
  deleteTask,
  fetchTasks,
  restoreTask,
  updateTask,
  updateTaskStatus,
};
