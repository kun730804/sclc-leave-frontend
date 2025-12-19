# SCLC Leave / Overtime Frontend (v3)

這份前端是給 Cloudflare Worker API 使用的靜態網頁（Netlify / GitHub Pages 都可）。

## 主要頁面
- `login.html`：登入（拿 JWT，存到 localStorage `auth_token`）
- `app.html`：月曆（讀取 `/api/events`）
- `admin.html`：管理者工具（ping + 手動同步）
- `change-password.html`：改密碼

## 本機快速測試（可選）
用任何 static server，例如：

```bash
python -m http.server 8080
```

然後開：`http://localhost:8080/login.html`

## 注意
- 月曆顯示的是 **CalendarEvents**（公司月曆）。
- 排假/加班資料目前是「先進 SCLC_DB 表」→ 再用 Worker **同步**進 CalendarEvents，所以你要測試：
  1) 先在 Google Sheet 更新 LeaveRequests / OvertimeRequests
  2) 用 app.html 的「同步」或 Console 叫 `/api/sync/...`
  3) 回到月曆看事件
