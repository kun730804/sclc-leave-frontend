# SCLC Netlify Frontend (JWT)

This is a minimal static frontend meant to be deployed on Netlify (via GitHub).
It talks to your Cloudflare Worker backend:

- Login: POST /api/login
- Me: GET /api/me
- Users (admin): GET /api/users
- Change password: POST /api/change-password

## Files
- index.html -> redirects to login.html
- login.html
- app.html
- change-password.html
- admin.html
- js/api.js

## Deploy
Commit these files to your GitHub repo and Netlify will auto-deploy.

## Configure API base
Edit `js/api.js` and change `API_BASE` if your Worker URL changes.
