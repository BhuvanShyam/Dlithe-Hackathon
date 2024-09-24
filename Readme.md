
# Contract-Based Farming System

## Project Overview

The **Contract-Based Farming System** is a web application designed to facilitate seamless interactions between farmers and buyers. The system allows farmers to list their crops, and buyers to browse these listings and create contracts for purchasing crops. The application includes features for user authentication, crop management, contract management, real-time chat, notifications, and personalized dashboards for both farmers and buyers.

## Features

- **User Authentication**
  - Registration and login for farmers and buyers.
  - Profile management for users.

- **Crop Management**
  - Farmers can create, update, and delete crop listings.
  - Buyers can browse and filter crop listings based on various criteria.

- **Contract Management**
  - Creation and management of contracts between farmers and buyers.
  - Status updates for contracts (pending, completed, cancelled).

- **Real-Time Chat**
  - Farmers and buyers can communicate in real-time to discuss crop details and contract terms.

- **Notifications**
  - Users receive notifications for new messages, contract requests, and updates.

- **Personalized Dashboards**
  - Farmers can view their crop listings, contract requests, and notifications.
  - Buyers can see available crop listings and contract statuses.

## Technologies Used

- **Frontend:**
  - React.js
  - Axios for API requests
  - Socket.IO for real-time chat
  - Tailwind CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose for ODM)

- **Others:**
  - JWT for authentication
  - Git for version control

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB (or a cloud MongoDB service like MongoDB Atlas)
- Git

### Clone the Repository

```bash
git clone https://github.com/BhuvanShyam/Dlithe-Hackathon.git
cd backend
```

### Install Dependencies

```bash
npm install 
```

### Set Up Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
PORT=your_desired_port
```

### Start the Application

```bash
npm start
```

## API Documentation

The application has several API endpoints for managing users, crops, contracts, and notifications. Below are some key endpoints:

### Authentication

- **POST /api/auth/register**: Registers a new user (Farmer or Buyer).
- **POST /api/auth/login**: Authenticates a user and returns a JWT token.
- **GET /api/auth/profile**: Retrieves the logged-in user's profile.

### Crop Management

- **POST /api/crops**: Creates a new crop listing.
- **GET /api/crops**: Retrieves all crop listings.
- **GET /api/crops/:cropId**: Retrieves details of a specific crop.
- **PUT /api/crops/:cropId**: Updates a crop listing.
- **DELETE /api/crops/:cropId**: Deletes a crop listing.

### Contract Management

- **POST /api/contracts**: Creates a new contract.
- **GET /api/contracts**: Retrieves all contracts related to the logged-in user.
- **GET /api/contracts/:contractId**: Retrieves details of a specific contract.
- **PUT /api/contracts/:contractId**: Updates a contract's status.
- **DELETE /api/contracts/:contractId**: Deletes a contract.

### Real-Time Chat

- **WebSocket /api/chat**: Establishes a WebSocket connection for real-time messaging.

### Notifications

- **POST /api/notifications**: Sends a notification.
- **GET /api/notifications**: Retrieves all notifications for the logged-in user.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to create a pull request or open an issue.


## Contact

For any questions or inquiries, feel free to reach out:

- **Your Name**: [SyanpseForage]
- **GitHub**: [Bhuvan](https://github.com/BhuvanShyam)

---

Thank you for checking out the Contract-Based Farming System! We hope it helps farmers and buyers connect effectively and streamline the farming process.
