# Smart Library Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing a library's book collection. Librarians can add, view, edit, and delete books from the library catalog.

## 📚 Project Description

The Smart Library Management System is a web-based application designed to help librarians efficiently manage their book collections. Built using the MERN stack, this application provides a user-friendly interface for performing CRUD (Create, Read, Update, Delete) operations on books.

### Key Features

- **Add Books**: Add new books with title, author, ISBN, and publication date
- **View Books**: Display all books in a responsive card layout with real-time statistics
- **Edit Books**: Update existing book information through a modal form
- **Delete Books**: Remove books from the library collection
- **Responsive Design**: Works on all screen sizes (320px and above)
- **Error Handling**: User-friendly error messages for all operations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with CSS Variables
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Smart_Library_System/
├── client/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── BookCard.jsx  # Individual book display
│   │   │   ├── BookForm.jsx  # Add book form
│   │   │   ├── BookList.jsx  # Books grid display
│   │   │   └── EditModal.jsx # Edit book modal
│   │   ├── services/         # API service layer
│   │   │   └── api.js        # Axios API calls
│   │   ├── App.jsx           # Main application component
│   │   ├── App.css           # Component styles
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Express Backend
│   ├── config/
│   │   └── db.js             # MongoDB connection configuration
│   ├── models/
│   │   └── Book.js           # Book Mongoose schema/model
│   ├── routes/
│   │   └── bookRoutes.js     # RESTful API routes
│   ├── server.js             # Express server entry point
│   ├── package.json
│   └── .env                  # Environment variables (not in repo)
│
├── .gitignore
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** or local MongoDB installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Zahid-Zafar/Smart-Library-System.git
cd Smart-Library-System
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/smart_library
```

Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

### Step 4: Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🏃 How to Run the Application

### Run Both Servers

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
```
The backend server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Server:**
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:3000`

### Access the Application

Open your browser and navigate to: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a single book by ID |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update an existing book |
| DELETE | `/api/books/:id` | Delete a book |

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | Required |

## 📝 Book Schema

```javascript
{
  title: String,          // Required - Book title
  author: String,         // Required - Author name
  isbn: String,           // Required, Unique - ISBN number
  publicationDate: Date   // Required - Publication date
}
```

## 👨‍💻 Author

**Zahid Zafar**
- GitHub: [@Zahid-Zafar](https://github.com/Zahid-Zafar)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
