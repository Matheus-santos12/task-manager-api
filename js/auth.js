import { get, post } from "./api.js";

export async function register(payload) {
  const existUserEmail = await get(`/users?email=${payload.email}`);
  if (existUserEmail.length > 0) {
    throw new Error("Email já cadastrado.");
  }

  const response = await post("/users", payload);
  return response;
}

export async function login(email, password) {
  const existUserEmail = await get(
    `/users?email=${email}&password=${password}`,
  );
  localStorage.setItem("user", JSON.stringify(existUserEmail[0]));
  if (existUserEmail.length === 0) {
    throw new Error("Email ou senha inválidos.");
  } else {
    return existUserEmail[0];
  }
}
