import { checkAuth } from "./router.js";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTaskStatus,
} from "./tasks.js";

checkAuth();

const logoutButton = document.getElementById("logout");
const welcomeMessage = document.getElementById("welcome-message");
const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;
const textNewTask = document.getElementById("text-new-task");
const toAdd = document.getElementById("to-add");
const tasksList = document.getElementById("to-do-list");

if (welcomeMessage && user?.name) {
  welcomeMessage.textContent = `Seja bem-vindo(a), ${user.name}!`;
} else if (!user) {
  window.location.href = "index.html";
}
logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.clear();
  window.location.replace("index.html");
});

async function init() {
  try {
    const tasks = await fetchTasks(false);
    renderTasks(tasks);
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

init();

function renderTasks(tasks) {
  tasksList.innerHTML = "";
  tasks.forEach((task) => {
    const element = createTaskElement(task);
    tasksList.appendChild(element);
  });
}

function createTaskElement(task) {
  const element = document.createElement("li");

  element.innerHTML = `
  <input type="checkbox" ${task.status === "done" ? "checked" : ""}>
  <span>${task.title}</span>
  <button class="delete-btn">Deletar</button>`;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const confirm = window.confirm(
      `Tem certeza que deseja deletar a tarefa "${task.title}"?`,
    );
    if (!confirm) return;
    try {
      await deleteTask(task.id);
      element.remove();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  });
  const checkedBtn = element.querySelector("input[type=checkbox]");

  checkedBtn.addEventListener("change", async (event) => {
    const novoEstado = event.target.checked;
    const status = event.target.checked ? "done" : "pending";

    try {
      const updatedTask = await updateTaskStatus(task.id, status);
      task.status = updatedTask.status;
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  });

  return element;
}

async function handlerAddTodo(event) {
  event.preventDefault();
  const title = textNewTask.value.trim();
  if (!title) {
    alert("Por favor, digite o título da nova tarefa!");
    return;
  }

  try {
    const newTask = await createTask(title);

    // Cria o visual.
    const element = createTaskElement(newTask);
    tasksList.appendChild(element);
    textNewTask.value = "";
    console.log("Tarefa adicionada com sucesso:", newTask);
  } catch (error) {
    alert("Não foi possível salvar a tarefa no banco de dados.");
    console.error("Erro ao adicionar tarefa:", error);
  }
}

toAdd.addEventListener("click", handlerAddTodo);
