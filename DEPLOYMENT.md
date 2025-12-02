# Portfolio Backend - Deployment Ready ✅

## Project Structure
```
portfolio3/
├── server.js                 # Express server
├── package.json              # Dependencies
├── .env                       # Environment variables (not in git)
├── .env.example              # Example env file
├── .gitignore                # Git ignore rules
├── messages.json             # Local fallback storage
├── public/
│   ├── css/index.css
│   └── js/index.js
├── views/
│   ├── index.ejs             # Home page
│   ├── contact.ejs           # Contact form page
│   └── requests.ejs          # View all messages
├── routes/
│   └── contact.js            # API routes
├── models/
│   └── Message.js            # Mongoose schema
└── assets/                   # Images, etc.
```

## Setup (Local)

```bash
cd portfolio3
npm install
# Create .env with MONGODB_URI
npm start
```

## URLs

- **Home:** http://localhost:3000/
- **Contact Form:** http://localhost:3000/contact
- **View Requests:** http://localhost:3000/requests
- **API Submit:** POST http://localhost:3000/api/contact
- **API View Messages:** GET http://localhost:3000/api/messages

## Environment Variables

```
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
ADMIN_KEY=your-secret-key
```

## Features

✅ Contact form with validation  
✅ Messages stored in MongoDB or JSON file  
✅ View all messages on `/requests` page  
✅ Responsive design (mobile-friendly)  
✅ EJS templating  
✅ CORS enabled  
✅ Error handling  

## Deployment (Render.com - Recommended)

1. Push to GitHub
2. Connect repo to Render.com
3. Set environment variables in dashboard:
   - `MONGODB_URI`
   - `ADMIN_KEY`
4. Deploy!

## Storage Options

- **MongoDB Atlas** (cloud, recommended)
- **Local MongoDB** (for development)
- **JSON file** (automatic fallback)

All data is persisted and safe! 🔒
