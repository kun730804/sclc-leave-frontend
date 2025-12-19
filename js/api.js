// api.js - minimal client for SCLC Cloudflare Worker
export const BASE = "https://misty-king-45d9.kun0224.workers.dev";

export function getToken() {
  return localStorage.getItem("auth_token") || localStorage.getItem("token") || "";
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("token", token); // backward compat
  }
}

export function clearToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("token");
}

export async function fetchJSON(path, opts={}) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const headers = new Headers(opts.headers || {});
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (opts.json !== undefined) {
    headers.set("Content-Type", "application/json");
    opts.body = JSON.stringify(opts.json);
  }
  const res = await fetch(url, {...opts, headers});
  const ct = res.headers.get("content-type") || "";
  let data = null;
  try {
    data = ct.includes("application/json") ? await res.json() : await res.text();
  } catch (e) {
    data = null;
  }
  if (!res.ok) {
    const msg = (data && data.error) ? data.error : (typeof data === "string" ? data : `HTTP ${res.status}`);
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
