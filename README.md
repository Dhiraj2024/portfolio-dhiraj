# Dhiraj's Portfolio

A modern portfolio website with a **Node.js + Express backend** for contact form submissions.

## Features
- **Frontend**: Responsive portfolio site with smooth animations, sections for skills, experience, projects, education, and services
- **Backend**: REST API to handle contact form submissions and store messages
- **Storage**: Messages saved to MongoDB (with file fallback to `messages.json`)
- **Admin Panel**: View all submitted contact messages at `/requests`

## Quick Start

1. Install dependencies: `npm install`
2. Create `.env` file with `PORT=3000`, `MONGODB_URI` (optional), and `ADMIN_KEY`
3. Run: `npm start` (or `npm run dev` for development)
4. Open: http://localhost:3000

## Pages
- `/` — Home (hero, skills, experience, projects, services)
- `/projects` — Projects gallery
- `/education` — Education details
- `/contact` — Contact form
- `/requests` — Admin dashboard for messages

## API
- `POST /api/contact` — Submit contact form
- `GET /api/messages?key=admin-key` — View messages

Deploy on Render.com, Railway, or Heroku. Set `MONGODB_URI` in environment variables for cloud persistence.
