import { get, patch, post } from "./api.js";

const user = JSON.parse(window.localStorage.getItem("user"));

const userId = user.id;

async function fetchTasks() {
  const tasks = await get(`/tasks?userId=${userId}`);
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
  });
  return softDelete;
}

async function toggleTask(taskId, completed) {
  const newPatch = await patch(`/tasks/${taskId}`, { completed });
  return newPatch;
}

async function updateTask(taskId, title, description) {
  const updatedTask = await patch(`/tasks/${taskId}`, { title, description });
  return updatedTask;
}

export { createTask, deleteTask, fetchTasks, toggleTask, updateTask };
