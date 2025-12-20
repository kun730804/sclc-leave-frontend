
const BASE = "https://misty-king-45d9.kun0224.workers.dev";

async function apiLogin(emp_no, password){
  const r = await fetch(`${BASE}/api/login`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({emp_no, password})
  });
  const j = await r.json();
  if(j.token){
    localStorage.setItem('auth_token', j.token);
  }
  return j;
}

async function apiGetEvents(start, end){
  const token = localStorage.getItem('auth_token');
  const r = await fetch(`${BASE}/api/events?start=${start}&end=${end}`,{
    headers:{Authorization:`Bearer ${token}`}
  });
  if(r.status===401){
    localStorage.removeItem('auth_token');
    location.href='login.html';
    throw new Error('unauthorized');
  }
  return r.json();
}
