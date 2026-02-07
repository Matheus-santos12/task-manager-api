import { createUser } from "./router.js";

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
    await createUser(payload);
  } catch (error) {
    alert(error.message);
    return;
  }
});
