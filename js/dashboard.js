import { checkAuth } from "./router.js";
import { createTask, fetchTasks } from "./tasks.js";

checkAuth();

const logoutButton = document.getElementById("logout");
const welcomeMessage = document.getElementById("welcome-message");
const user = JSON.parse(window.localStorage.getItem("user"));
const textNewTask = document.getElementById("text-new-task");
const toAdd = document.getElementById("to-add");
const tasksList = document.getElementById("to-do-list");

if (welcomeMessage && user) {
  welcomeMessage.textContent = `Seja bem-vindo(a), ${user.name}!`;
}

logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.href = "index.html";
});

async function init() {
  try {
    const tasks = await fetchTasks();
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
  element.textContent = task.title;
  return element;
}

async function handlerAddTodo() {
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
