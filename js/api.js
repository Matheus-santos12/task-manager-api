const API_URL = "http://localhost:3333";

async function get(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(" Houve uma falha na requisição:", error);
    throw error;
  }
}

async function post(endpoint, data) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Houve uma falha na requisição:", error);
    throw error;
  }
}

async function patch(endpoint, data) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Houve uma falha na requisição:", error);
    throw error;
  }
}

async function del(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    if (res.status === 204) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Houve uma falha na requisição:", error);
    throw error;
  }
}

export { del, get, patch, post };
