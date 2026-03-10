# 🎉 Event Manager

A full-stack **Event Management Web Application** built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, view, edit, delete, search, and filter events through a clean and responsive dashboard UI.

---

## 📸 Features

- 📋 **Event Dashboard** — View all events in a tabular layout with live stats (Total, Online, Offline counts)
- ➕ **Create Events** — Add new events with full details via a dedicated form
- ✏️ **Edit Events** — Update existing event information seamlessly
- 🗑️ **Delete Events** — Remove events with a confirmation prompt
- 🔍 **Search Events** — Filter events by title in real-time
- 📅 **Filter by Date** — Narrow down events to a specific date
- 🌐 **Filter by Mode** — Filter events by Online or Offline mode
- 📄 **Event Detail Page** — View complete details of any individual event
- 🔔 **Toast Notifications** — Real-time success/error feedback on all actions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests to the backend |
| Tailwind CSS v3 | Utility-first styling |
| DaisyUI v4 | Component library on top of Tailwind |
| React Hot Toast | Toast notifications |
| Lucide React | Icon library |
| Vite | Development server & bundler |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js v5 | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |
| Nodemon | Auto-restart during development |

---

## 📁 Project Structure

```
Sakshi/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection setup
│   │   ├── controllers/
│   │   │   └── eventController.js  # Business logic for all event operations
│   │   ├── models/
│   │   │   └── eventModel.js       # Mongoose schema & model for Event
│   │   ├── routes/
│   │   │   └── eventRoutes.js      # API route definitions
│   │   └── server.js               # Express app entry point
│   ├── .env                        # Environment variables
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Top navigation bar
    │   │   ├── EventCard.jsx        # Reusable event card component
    │   │   └── EventNotFound.jsx    # Fallback component
    │   ├── lib/
    │   │   ├── axios.js             # Axios instance with base URL
    │   │   └── utils.js             # Utility functions
    │   ├── pages/
    │   │   ├── HomePage.jsx         # Dashboard with event table & filters
    │   │   ├── CreateEventPage.jsx  # Create & Edit event form
    │   │   └── EventDetailPage.jsx  # Single event detail view
    │   ├── App.jsx                  # Root component with routing
    │   ├── main.jsx                 # React entry point
    │   └── index.css                # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🗃️ Data Model

### Event Schema (MongoDB)

| Field | Type | Required | Description |
|---|---|---|---|
| `eventTitle` | String | ✅ | Title of the event |
| `eventType` | String | ✅ | Category/type (e.g., Workshop, Seminar) |
| `description` | String | ❌ | Detailed description of the event |
| `speakerName` | String | ❌ | Name of the speaker or host |
| `eventDate` | String | ✅ | Date of the event |
| `eventTime` | String | ❌ | Time of the event |
| `mode` | String | ❌ | `Online` or `Offline` |
| `location` | String | ✅ | Venue address or meeting link |
| `createdAt` | Date | auto | Timestamp (auto-managed) |
| `updatedAt` | Date | auto | Timestamp (auto-managed) |

---

## 🔌 API Endpoints

Base URL: `http://localhost:3001`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/events` | Create a new event |
| `GET` | `/events` | Get all events |
| `GET` | `/events/:id` | Get a single event by ID |
| `PUT` | `/events/:id` | Update an event by ID |
| `DELETE` | `/events/:id` | Delete an event by ID |
| `GET` | `/events/search/:title` | Search events by title (case-insensitive) |
| `GET` | `/events/date/:date` | Filter events by a specific date |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-manager.git
cd event-manager
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string_here
PORT=3001
```

> ⚠️ **Important:** Never commit your `.env` file to GitHub. Make sure it is listed in your `.gitignore`.

Start the backend server:

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The backend will run at: `http://localhost:3001`

---

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## 🖥️ Application Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home / Dashboard | View all events, stats, search & filter |
| `/create` | Create Event | Form to add a new event |
| `/edit/:id` | Edit Event | Pre-filled form to update an existing event |
| `/events/:id` | Event Detail | Full details of a single event |

---

## 🌍 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT` | Port for the Express server | `3001` |

---

## 📦 Available Scripts

### Backend

```bash
npm run dev    # Start server with nodemon (development)
npm start      # Start server with node (production)
```

### Frontend

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## 🔒 Security Notes

- The `.env` file contains sensitive credentials and **must not be pushed to GitHub**.
- Ensure your `.gitignore` includes:
  ```
  .env
  node_modules/
  ```
- Consider adding input validation and error handling middleware to the backend for production use.

---

## 🚀 Future Improvements

- [ ] User authentication (JWT-based login/signup)
- [ ] Event image upload support
- [ ] Pagination for large event lists
- [ ] Export events to CSV/PDF
- [ ] Email notifications for event reminders
- [ ] Calendar view for events

---

## 👩‍💻 Author

**Sakshi Singh**

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
