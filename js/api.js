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

export { get, post };
