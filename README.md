# TaskMaster: A 3MMT Capstone Project

TaskMaster is a robust full-stack web application designed to streamline task management. Built with **Node.js**, **Express.js**, and **MongoDB** on the backend, and **HTML**, **CSS**, and **JavaScript** on the frontend, the application allows users to register, log in, and efficiently manage their tasks.

---

## Features

1. **User Authentication**:

   - Secure user registration and login with JWT-based authentication.
   - Passwords are hashed for security.

2. **Task Management**:

   - Create, update, and delete tasks.
   - Assign priorities (low, medium, high).
   - Set deadlines and descriptions for tasks.

3. **Dynamic Task Loading**:

   - Tasks are dynamically fetched and displayed on the frontend using RESTful APIs.

4. **Personalized User Experience**:

   - Displays a personalized welcome message upon login (e.g., "Welcome, John Doe!").

5. **Logout Feature**:

   - Allows users to log out securely, clearing session tokens.

6. **Responsive Design**:
   - User-friendly UI with a clean and professional layout.

---

## Technologies Used

### Backend:

- **Node.js**: Server-side runtime environment.
- **Express.js**: Backend framework for handling routing and APIs.
- **MongoDB**: NoSQL database for data storage.
- **JWT (JsonWebToken)**: For secure authentication.
- **bcryptjs**: For hashing passwords.

### Frontend:

- **HTML/CSS**: For the user interface.
- **JavaScript**: For interactivity and dynamic updates.

### Development Tools:

- **Postman**: For API testing.
- **VS Code**: Code editor.
- **Node.js v22.11.0**: Development environment.
- **npm**: Dependency management.

---

## File Tree Structure

TaskMaster/
├── backend/
│ ├── controllers/
│ │ ├── authController.js # Handles user authentication logic.
│ │ ├── taskController.js # Manages task CRUD operations.
│ ├── middleware/
│ │ └── authMiddleware.js # Authentication middleware for protecting routes.
│ ├── models/
│ │ ├── Task.js # Task schema definition.
│ │ ├── User.js # User schema definition.
│ ├── routes/
│ │ ├── authRoutes.js # Authentication-related routes.
│ │ ├── taskRoutes.js # Task-related routes.
│ ├── .env # Environment variables.
│ ├── server.js # Main server file.
│
├── frontend/
│ ├── css/
│ │ └── style.css # Styling for the application.
│ ├── js/
│ │ └── app.js # Frontend logic and API integration.
│ ├── index.html # Main HTML file.
│
├── .gitignore # Ignored files and folders for Git.
├── package.json # Dependencies and scripts.
├── README.md # Project documentation (this file).
