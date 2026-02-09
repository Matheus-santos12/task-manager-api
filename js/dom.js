import { register } from "./auth.js";

const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  const payload = {
    name,
    email,
    password,
  };

  try {
    await register(payload);
    alert("Seu cadastro foi realizado com sucesso!");
    form.reset();
  } catch (error) {
    alert("Verifique os dados informados e tente novamente.");
    return;
  }
});
