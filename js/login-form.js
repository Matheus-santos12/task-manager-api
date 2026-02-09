import { login } from "./auth.js";

const buttonShowLogin = document.getElementById("show-login");
const buttonShowRegister = document.getElementById("show-register");
const registerContainer = document.getElementById("register-container");
const loginContainer = document.getElementById("login-container");

buttonShowLogin.addEventListener("click", () => {
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
});

buttonShowRegister.addEventListener("click", () => {
  loginContainer.style.display = "none";
  registerContainer.style.display = "block";
});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    const response = await login(email, password);
    window.localStorage.setItem("user", JSON.stringify(response));
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Verifique se o email e senha estão corretos e tente novamente.");
  }
});
