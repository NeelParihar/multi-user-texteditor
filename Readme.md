# Real-time Collaborative Text Editor

## Overview

This project is a simple multi-user real-time collaborative text editor built using Quill.js on the frontend and Node.js on the backend. The frontend is written in React.js and uses Quill.js as the rich text editor, while the backend is written in Node.js and uses socket.io for real-time communication between clients.

Deployed link : [Click!](https://text-editor-frontend-production.up.railway.app/)

To build and run the frontend app:
1. Clone the repository
2. Run `cd client`
3. Run `npm install` to install the dependencies
4. Run `cp .env.template .env` to create .env file
5. Run `npm start` to start the development server
6. Open `http://localhost:3000` in your browser

To build and run the backend app:
1. Clone the repository
2. Run `cd server`
3. Run `npm install` to install the dependencies
4. Run `cp .env.template .env` to create .env file
5. Run `npm start` to start the development server

## Architecture and System Design

The frontend of the app is built using React.js and Quill.js, which is a rich text editor library. The Quill.js library has a built-in Operational Transformation (OT) algorithm for handling real-time collaboration, which is used to ensure that all clients see the same version of the text, even when multiple users are editing the text simultaneously. The text editor is connected to the backend using socket.io, which allows for real-time communication between clients.

The backend is built using Node.js and socket.io. It receives the changes made by the clients using Quill.js and broadcasts them to all connected clients. This way, all clients have the same version of the text and can see the updates made by other users in real-time.

## Conflict Resolution

Conflict resolution is handled automatically by the Quill.js library's built-in Operational Transformation (OT) algorithm. This algorithm ensures that all clients see the same version of the text, even when multiple users are editing the text simultaneously. The OT algorithm tracks the version of the text and the version of the users and automatically resolves any conflicts that may arise. The backend receives these changes and broadcasts them to all connected clients.

This approach ensures that the text is always in sync and that all clients see the same version of the text, even when multiple users are editing the text simultaneously. This makes it a scalable and efficient solution for real-time collaborative editing.

## Additional Features

If I had more time, it would be interesting to explore other features such as user management and document sharing, or the integration of other libraries and technologies such as Firepad or ShareDB. Additionally, it would be interesting to explore the scalability and performance of this app in a large-scale multi-user environment.
