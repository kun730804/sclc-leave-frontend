const API_BASE = "https://misty-king-45d9.kun0224.workers.dev";

export function getToken() {
  return localStorage.getItem("auth_token") || localStorage.getItem("token") || "";
}

export function setToken(t) {
  localStorage.setItem("auth_token", t);
  // backward compat
  localStorage.setItem("token", t);
}

export function clearToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("token");
}

export async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const err = new Error(data?.error || data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
