const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.href = "index.html";
});

if (!window.localStorage.getItem("user")) {
  window.location.href = "index.html";
} else {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.textContent = `Seja bem-vindo, ${user.name}!`;
  console.log(user);
}
