import { fetchTasks } from "./tasks.js";

console.log(" O arquivo está sendo carregado");
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.href = "index.html";
});

if (!window.localStorage.getItem("user")) {
  window.location.href = "index.html";
} else {
  console.log(" O usuário está logado");
  const user = JSON.parse(window.localStorage.getItem("user"));
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.textContent = `Seja bem-vindo, ${user.name}!`;
  window.location.href = "dashboard.html";
  console.log(user);
}

async function init() {
  console.log("Iniciando a página🔴");
  const tasks = await fetchTasks();
  console.log(tasks);
}
console.log(" Chama a função init🔴");
init();
console.log(" Chamou a função init🔴");
