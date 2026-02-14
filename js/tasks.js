import { del, get, patch, post } from "./api.js";

const user = JSON.parse(window.localStorage.getItem("user"));

const userId = user.id;

async function fetchTasks() {
  const tasks = await get(`/tasks?userId=${userId}`);
  return tasks;
}

async function createTask(title, description) {
  const newTask = {
    userId: userId,
    title: title,
    description: description,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  return await post("/tasks", newTask);
}

async function deleteTask(taskId) {
  const res = await del(`/tasks/${taskId}`);
  return res;
}

async function toggleTask(taskId, completed) {
  const newPatch = await patch(`/tasks/${taskId}`, { completed: !completed });
  return newPatch;
}

async function updateTask(taskId, title, description) {
  const updatedTask = await patch(`/tasks/${taskId}`, { title, description });
  return updatedTask;
}

export { createTask, deleteTask, fetchTasks, toggleTask, updateTask };
