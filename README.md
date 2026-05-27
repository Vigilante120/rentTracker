# RentTrack

RentTrack is a Django + React (Vite) app for tracking rented items and debts. The backend exposes a REST API secured with JWT. The frontend uses Google Sign-In and email/password auth.

## Project Structure

- `RentTrack/`: Django project settings and URL routing.
- `tracker/`: Django app (models, serializers, views, URLs).
- `frontend/`: Vite + React frontend.
- `db.sqlite3`: Local dev SQLite database (not used on Render).

## Key Backend Modules

- `tracker/models.py`: Custom `User`, rent items, owed money, OTPs.
- `tracker/serializers.py`: API request/response validation.
- `tracker/views.py`: Auth endpoints and CRUD viewsets.
- `tracker/urls.py`: API routes under `/api/`.
- `RentTrack/settings.py`: DB, auth, JWT, CORS, env config.

## Key Frontend Modules

- `frontend/src/services/api.js`: Axios client, base URL, JWT header injection.
- `frontend/src/services/auth.js`: Auth calls and token storage.
- `frontend/src/pages/Login.jsx`: Login + Google Sign-In flow.
- `frontend/src/pages/Dashboard.jsx`: Data fetching and UI for rent/owed items.

## Environment Variables

### Backend (.env or Render Env)

Required:
- `DJANGO_SECRET_KEY`
- `DEBUG` (use `False` in production)
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_HOST`
- `POSTGRES_PORT`

Auth:
- `GOOGLE_OAUTH_CLIENT_ID`

Email (only if OTP email is used):
- `EMAIL_BACKEND`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USE_TLS`
- `EMAIL_HOST_USER`
- `EMAIL_HOST_PASSWORD`
- `DEFAULT_FROM_EMAIL`

### Frontend (Vercel)

- `VITE_API_BASE_URL` = `https://<render-backend>.onrender.com/api`
- `VITE_GOOGLE_CLIENT_ID`

## Local Development

Backend:

```
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend:

```
cd frontend
npm install
npm run dev
```

## Common Update Checklist

- Backend API changes: update serializers and views, then update frontend services/pages.
- New model fields: add migrations, run `python manage.py migrate`, and update serializers.
- Auth updates: verify frontend `VITE_API_BASE_URL` and backend `GOOGLE_OAUTH_CLIENT_ID`.
- Deployment changes: see `deployment-section.md`.
