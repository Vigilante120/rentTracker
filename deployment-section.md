# Deployment Section

This document captures the production deployment flow and the fixes that prevent common downtime.

## Render Backend

### Build Command

```
pip install -r requirements.txt
```

### Start Command

```
python manage.py migrate && gunicorn RentTrack.wsgi:application --bind 0.0.0.0:$PORT
```

### Required Render Env Vars

- `DJANGO_SECRET_KEY`
- `DEBUG=False`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_HOST` (Render Postgres host, not `localhost`)
- `POSTGRES_PORT`
- `GOOGLE_OAUTH_CLIENT_ID`

Optional email vars (OTP email only):
- `EMAIL_BACKEND`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USE_TLS`
- `EMAIL_HOST_USER`
- `EMAIL_HOST_PASSWORD`
- `DEFAULT_FROM_EMAIL`

### Render Postgres

- Create a Render Postgres instance.
- Copy host/user/password/db/port from the **Connections** page.
- Set the backend env vars accordingly.
- Redeploy the backend.

## Vercel Frontend

### Env Vars

- `VITE_API_BASE_URL` = `https://<render-backend>.onrender.com/api`
- `VITE_GOOGLE_CLIENT_ID`

### Notes

- If `VITE_API_BASE_URL` is missing, the frontend falls back to `http://localhost:8000/api` and auth fails in production.

## Common Failures and Fixes

- **500 on auth or signup**: Backend DB env vars still point to `localhost`. Fix env vars to Render Postgres.
- **404 on auth**: Missing `/api` in `VITE_API_BASE_URL`.
- **Empty dashboard data**: New Render Postgres is empty; import data if needed.
- **Missing tables / relation does not exist**: Tracker migrations were not committed. Ensure `.gitignore` allows `tracker/migrations/*.py`, run `python manage.py makemigrations tracker`, commit, push, and redeploy.

## Verify After Deploy

- `POST https://<render-backend>.onrender.com/api/auth/signup/`
- `POST https://<render-backend>.onrender.com/api/auth/login/`
- `POST https://<render-backend>.onrender.com/api/auth/google/`
