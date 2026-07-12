# 🍲 Savorly — Client

Savorly is a recipe-sharing platform where anyone can browse recipes without an account, and registered users can post, manage, and share the dishes they cook regularly. This is the frontend, built with Next.js (App Router) and TypeScript.

## 🔗 Live Demo

- **Client:** https://savorly244.netlify.app/

---

## 🚀 Features
- Browse and search recipes without logging in
- Filter recipes by category, difficulty, and cook time, with sorting (newest, rating, cook time)
- Paginated recipe listing (Explore page)
- Detailed recipe view — ingredients, step-by-step method, nutrition breakdown, and reviews
- Add new recipes with image upload
- "Manage Recipes" dashboard — regular users see their own posts, admins see and moderate every recipe on the platform
- JWT-based authentication (register/login/logout) using secure HTTP-only cookies
- Home page with featured (top-rated) recipes, category browsing, and live platform stats
- Toast notifications for actions (login, publish, delete, errors)
- Fully responsive layout for mobile, tablet, and desktop

---

## 🛠️ Technology Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast
- Recharts (category stats chart)
- Lucide React (icons)

---

## 📦 Installation

```bash
git clone <repository-url>
cd savorly-client
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of the client folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
---

## ▶️ Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Make sure `savorly-server` is running first — API calls will fail otherwise.

### Build for production
```bash
npm run build
npm run start
```

---

## 👤 User Roles

### Guest (not logged in)
- Browse and search all recipes
- View full recipe details, ingredients, steps, and reviews

### User
- Everything a guest can do
- Add new recipes with photo upload
- View and delete their own posted recipes from "Manage Recipes"

### Admin
- Everything a user can do
- "Manage Recipes" shows every recipe on the platform, not just their own
- Can delete any user's recipe (moderation)

---

## 📁 Project Structure (key folders)

```
src/
  app/(main)/       → pages: home, explore, recipe details, add/manage recipes, login, register
  components/       → auth, home, layout, recipes, and shared UI components
  context/           → AuthContext (login/register/logout, current user state)
  lib/               → axios instance (api.ts)
  types/             → shared TypeScript types (Recipe, AuthUser, Review)
```

---

## 📝 Notes
- Images can be uploaded directly (via the server's ImgBB integration) or referenced from an already-hosted URL.
- The server must be reachable at the URL set in `NEXT_PUBLIC_API_URL`, or auth, recipes, and stats requests will fail.


