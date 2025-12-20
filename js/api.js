// api.js - minimal client for SCLC Worker
const BASE = "https://misty-king-45d9.kun0224.workers.dev";

export function getToken() {
  return localStorage.getItem("auth_token") || localStorage.getItem("token") || "";
}
export function setToken(t) {
  if (!t) return;
  localStorage.setItem("auth_token", t);
  localStorage.setItem("token", t); // backward compatible
}
export function clearToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("token");
}

async function req(path, opts={}) {
  const token = getToken();
  const headers = Object.assign({}, opts.headers || {});
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(BASE + path, Object.assign({ headers }, opts));
  let data = null;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    data = await res.json().catch(() => null);
  } else {
    data = await res.text().catch(() => null);
  }
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || res.statusText || "Request failed";
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function login(emp_no, password) {
  const data = await req("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emp_no, password })
  });
  if (data?.token) setToken(data.token);
  return data;
}

export async function me() {
  return await req("/api/me");
}

export async function changePassword(old_password, new_password) {
  return await req("/api/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ old_password, new_password })
  });
}

export async function fetchEvents(start, end) {
  const qs = new URLSearchParams({ start, end }).toString();
  return await req(`/api/events?${qs}`);
}

export async function syncLeaveEvents(start, end) {
  const qs = new URLSearchParams({ start, end }).toString();
  return await req(`/api/sync/leave-events?${qs}`, { method: "POST" });
}

export async function syncOvertimeEvents(start, end) {
  const qs = new URLSearchParams({ start, end }).toString();
  return await req(`/api/sync/overtime-events?${qs}`, { method: "POST" });
}
