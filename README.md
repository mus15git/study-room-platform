# Study Room Platform

A full-stack Study Room Platform built using the MERN stack. Users can create study rooms, join rooms, chat in real time, and manage study sessions using a customizable timer.

## Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Create Study Rooms
* Join Study Rooms
* Delete Study Rooms
* Real-Time Chat using Socket.IO
* Custom Study Timer
* Logout Functionality
* MongoDB Atlas Integration

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas

## Project Structure

study-room-platform/

client/

* React Frontend

server/

* Express Backend
* MongoDB Models
* Routes
* Socket.IO

## Installation

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

## Application Modules

### Authentication

* Register
* Login
* Logout
* Protected Routes

### Study Rooms

* Create Room
* Join Room
* Delete Room

### Real-Time Chat

* Socket.IO Integration
* Live Messaging

### Study Timer

* Custom Duration
* Start / Pause / Reset

## Future Enhancements

* Online User Count
* Chat History Persistence
* Video Calling
* Forgot Password
* Study Analytics Dashboard

## Author

Developed as an Internship Assignment Project using the MERN Stack.
