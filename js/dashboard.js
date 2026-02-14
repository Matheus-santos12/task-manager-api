import { checkAuth } from "./router.js";
import { fetchTasks } from "./tasks.js";

checkAuth();

console.log(" O arquivo está sendo carregado");

const logoutButton = document.getElementById("logout");
const welcomeMessage = document.getElementById("welcome-message");
const user = JSON.parse(window.localStorage.getItem("user"));

if (welcomeMessage && user) {
  welcomeMessage.textContent = `Seja bem-vindo, ${user.name}!`;
}

logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.href = "index.html";
});

async function init() {
  try {
    const tasks = await fetchTasks();
    console.log("Tarefas carregadas", tasks);
    renderTasks(tasks);
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

init();

function renderTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""}> 
    <span>${task.title}</span> 
    <button class="delete-btn">Deletar</button>`;

    taskList.appendChild(listItem);
  });
}
