# Savorly — Client (Frontend)

Next.js + TypeScript + Tailwind CSS frontend for Savorly, a recipe sharing platform.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
   To make sure you get the latest compatible versions instead of the ones pinned here:
   ```
   npm install next@latest react@latest react-dom@latest axios@latest react-hook-form@latest react-hot-toast@latest recharts@latest lucide-react@latest
   npm install -D typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest tailwindcss@latest postcss@latest autoprefixer@latest
   ```

2. Environment variables — `.env.local` is already included, pointing to the local backend:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
   Change this to your deployed backend URL when you deploy.

3. Run the dev server:
   ```
   npm run dev
   ```
   Open http://localhost:3000

4. Build for production:
   ```
   npm run build
   npm run start
   ```

## Notes
- Make sure the backend server (`savorly-server`) is running before starting the client, or API calls will fail.
- Demo login button on the login page auto-fills the demo user credentials (only works after running the seed script on the server).
