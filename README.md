# Ashraful's Portfolio CMS

A Next.js portfolio frontend backed by a Django REST API and PostgreSQL. Django Admin is the content management interface; the frontend keeps its existing layout and fetches portfolio and blog content from the API.

## Structure

```text
Frontend/   Next.js, React, TypeScript, Tailwind CSS
Backend/    Django, Django REST Framework, PostgreSQL
README.md
```

## Requirements

- Node.js 22 and pnpm 9+ (or npm)
- Python 3.11+
- PostgreSQL

## Backend setup

From `Backend/`, create and activate a virtual environment, install dependencies, and configure the database:

```powershell
cd Backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Create a PostgreSQL database and user, then set the connection fields in `Backend/.env`:

```env
POSTGRES_DB=portfolio
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=your-password
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_CONN_MAX_AGE=0
```

Apply the schema and load the current portfolio data:

```powershell
python manage.py migrate
python manage.py seed_portfolio
python manage.py createsuperuser
python manage.py runserver
```

Django requires these PostgreSQL settings and does not fall back to SQLite. The seed command is safe to rerun; it updates the initial content and does not create blog posts. The seeded featured projects are Dokanly, Vangari Mama, and TikTok Clone.

## Deploy the backend to Vercel

Set the Vercel project root to `Backend`. The backend entrypoint is `config/wsgi.py`; it exports the WSGI application as `app`. The Vercel build command runs `python manage.py collectstatic --noinput` before packaging the function.

In Vercel project environment variables, set `DEBUG=False`, `SECRET_KEY`, the `POSTGRES_*` fields, and `FRONTEND_URL` to the deployed frontend origin. Add that origin to `CORS_ALLOWED_ORIGINS`. Vercel deployment hostnames are added to Django's allowed hosts automatically; add any custom backend hostname to `ALLOWED_HOSTS`.

WhiteNoise serves Django admin static assets. Vercel's filesystem is temporary, so uploaded media and resume files need external object storage to persist across deployments and function instances.

Open the CMS at [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/). Sign in with the superuser created above. Uploaded images and resume files are stored under `Backend/media/` and served by Django in development.

## Frontend setup

From `Frontend/`:

```powershell
Copy-Item .env.example .env.local
pnpm install
pnpm dev
```

The portfolio runs at [http://localhost:1408](http://localhost:1408). Set `NEXT_PUBLIC_API_URL` to the Django API root, such as `http://127.0.0.1:8000/api`, and set `APP_URL` to the public site URL for metadata, sitemap, and RSS links. The `/admin` frontend path forwards to Django Admin; `NEXT_PUBLIC_ADMIN_URL` can override its destination.

For the real GitHub contribution calendar, set `GITHUB_TOKEN` on the Next.js server to a GitHub token that can read the public user's contribution calendar. GitHub profile details come from GitHub's public REST API. If the token is absent or GitHub is unavailable, the contribution graph reports that state without drawing placeholder squares.

## Content management

Edit profile and portfolio sections in Django Admin. Public API endpoints are read-only; anonymous users cannot create, change, or delete CMS data through the API.

To publish a blog post:

1. Run the Django backend and open `/admin/`.
2. Sign in and open **Blog posts**.
3. Create the title, slug, excerpt, Markdown content, author, category, tags, and optional featured image.
4. Save as a draft or choose **Published** and set the publish date.
5. The frontend lists published posts at `/blog` and links each post at `/blog/<slug>`.

The homepage Blog section shows the latest published posts. Drafts and future-dated posts are excluded from public APIs. Categories and tags are managed in their own admin sections.

## API

All routes below are public, read-only JSON endpoints under `/api/`:

| Endpoint | Content |
| --- | --- |
| `/api/profile/` | Profile and contact information |
| `/api/about/` | About section |
| `/api/projects/?featured=true` | Published featured projects |
| `/api/projects/<slug>/` | Published project |
| `/api/experience/` | Visible experience entries |
| `/api/education/` | Visible education entries |
| `/api/skills/` | Visible stack items |
| `/api/social-links/` | Visible social links |
| `/api/resume/` | Current resume |
| `/api/achievements/` | Visible achievements |
| `/api/certifications/` | Visible certifications |
| `/api/research/` | Visible research entries |
| `/api/blog/posts/?page=1` | Published posts, paginated |
| `/api/blog/posts/<slug>/` | Published post |
| `/api/blog/categories/` | Blog categories |
| `/api/blog/tags/` | Blog tags |

Configure `CORS_ALLOWED_ORIGINS` (or `FRONTEND_URL`) in `Backend/.env` with the exact deployed frontend origin. CORS is restricted to configured origins.

## Environment variables

Backend: `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_CONN_MAX_AGE`, `FRONTEND_URL`, and optionally `CORS_ALLOWED_ORIGINS`.

Frontend: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_ADMIN_URL`, `APP_URL`, and server-only `GITHUB_TOKEN`.

Do not commit `.env` or `.env.local` files.
