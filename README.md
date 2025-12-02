# portfolio3 — Express backend for contact form

This folder adds a simple Node + Express backend so visitors can contact you from the portfolio site. Messages are saved to MongoDB when `MONGODB_URI` is provided; otherwise they are stored in `messages.json`.

Setup

1. Install dependencies:

```cmd
cd d:\Allfiles\portfolio\portfolio3
npm install
```

2. Create a `.env` file (or set env vars). You can copy `.env.example`:

```
PORT=3000
MONGODB_URI=your_mongo_uri_here
ADMIN_KEY=some-secret-key
```

Run

```cmd
npm start
```

API

- POST `/api/contact` — accept JSON body: `{ name, email, message }`.
  - Returns `201` and `{ success: true, source: 'mongodb' }` when saved to MongoDB, or `source: 'file'` when saved to `messages.json`.
- GET `/api/messages?key=YOUR_ADMIN_KEY` — returns saved messages (protected if `ADMIN_KEY` is set).

Example curl

```cmd
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"John\",\"email\":\"john@example.com\",\"message\":\"Hello!\"}"

curl http://localhost:3000/api/messages?key=some-secret-key
```

Integrating with your front-end

From the portfolio front-end you can `fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...}) })`.
