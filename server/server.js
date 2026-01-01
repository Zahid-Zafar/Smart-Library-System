/**
 * Smart Library Management System - Backend Server
 * Main entry point for the Express.js application
 * 
 * This server handles all API requests for the library management system
 * including book CRUD operations and borrowing functionality
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

// Initialize Express application
const app = express();

// Define server port - defaults to 5000 if not specified in environment
const PORT = process.env.PORT || 5000;

/**
 * Middleware Configuration
 */

// Enable CORS for cross-origin requests from frontend
// This allows the React frontend to communicate with the backend
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React dev server ports
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Parse incoming JSON request bodies
// Required for handling POST and PUT requests with JSON data
app.use(express.json());

// Parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

/**
 * API Routes
 */

// Mount book routes at /api/books endpoint
app.use('/api/books', bookRoutes);

// Root endpoint - API health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Smart Library Management System API',
        version: '1.0.0',
        endpoints: {
            getAllBooks: 'GET /api/books',
            getBookById: 'GET /api/books/:id',
            addBook: 'POST /api/books',
            updateBook: 'PUT /api/books/:id',
            deleteBook: 'DELETE /api/books/:id'
        }
    });
});

/**
 * Error Handling Middleware
 * Catches any unhandled errors and returns a friendly error message
 */
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server. Please try again later.'
    });
});

// Handle 404 - Route not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

/**
 * Server Startup
 * Connect to MongoDB and start the Express server
 */
const startServer = async () => {
    try {
        // Connect to MongoDB database
        await connectDB();
        
        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`API available at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

// Initialize the server
startServer();
