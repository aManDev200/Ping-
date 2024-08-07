# PING! Real-Time Chat Application

PING! is a feature-rich, real-time chat application built with React, Express, and Socket.IO. It offers a seamless communication experience with both individual and group chat capabilities.

## Features

1. User Authentication
   - Register and log in with a username

2. User Search
   - Find other users on the platform

3. Friend Requests
   - Send friend requests to other users
   - Receive notifications about incoming friend requests
   - Accept friend requests

4. Chat Functionality
   - View personal chat list
   - Send messages and attachments in real-time

5. Group Chat
   - Create group chats with 3-100 members
   - Group admin features:
     - Rename the group
     - Add or remove members
     - Delete the group
   - Members can leave the group
   - Automatic reassignment of admin role if the current admin leaves

6. User Management
   - Delete chats or unfriend users

7. Admin Dashboard
   - Access with a secret key
   - View users, messages, and chats

## Technologies Used

- Frontend: React
- Backend: Express.js
- Real-time Communication: Socket.IO
- Database: [MongoDB]
- Authentication: [JWT]

## Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn
- [Any other specific requirements]

## Installation

1. Clone the repository:
2. Install dependencies for both frontend and backend:
3. 3. Set up environment variables:
- Create a `.env` file in the backend directory
- Add necessary environment variables (e.g., DATABASE_URL, JWT_SECRET, etc.)

4. Start the backend server:
5. 5. Start the frontend development server:
   6. 6. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Register a new account or log in with existing credentials
2. Search for users and send friend requests
3. Start chatting with friends or create group chats
4. Enjoy real-time messaging and file sharing!

## API Documentation

[If you have API documentation, provide a link or brief overview here]

## Contributing

We welcome contributions to PING! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgements

- [Socket.IO](https://socket.io/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
