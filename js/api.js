const API_URL = "http://localhost:3333";

async function get(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  const data = await res.json();
  return data;
}

async function post(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

async function patch(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

async function del(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  return await res.json();
}

export { del, get, patch, post };
