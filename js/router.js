import { get, post } from "./api.js";

export async function createUser(payload) {
  const existUserEmail = await get(`/users?email=${payload.email}`);
  if (existUserEmail.length > 0) {
    throw new Error("Email already registered");
  }

  const password = payload.password + "123";
  const response = await post("/users", { ...payload, password });
  return response;
}
