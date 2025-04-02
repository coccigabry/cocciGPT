# COCCI GPT

A Full-Stack JavaScript model-AI webApp built with React.js, Node.js and MongoDB. Ai powered by Google Gemini.

## Features

- **User authentication** with Clerk
- **RESTful API** with CRUD operations
- **Responsive design** with mobile-first approach
- **Database integration** with MongoDB/Mongoose
- **AI integration** with Google Gemini

## Tech Stack

### Frontend
- React.js 18+
- React Router v7
- Vite (build tool)

### Backend
- Node.js 16+
- Express.js
- MongoDB (with Mongoose ODM)
- Clerk React SDK for authentication
- ImageKit for images storage
- DotEnv for loading environment variables from a .env file into process.env

## Prerequisites

Before running the project, ensure you have installed:
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- MongoDB (local or Atlas connection string)

## Installation

1. Clone the repository:

 bash   
 
    git clone https://github.com/coccigabry/cocciGPT.git && cd cocciGPT
 
2. Install dependencies for both frontend and backend:

 bash
 
 Install backend dependencies from project root directory 
 
    cd backend && npm install
 
 Install frontend dependencies from project root directory 
 
    cd client && npm install   

3. Set up environment variables:

   Create `.env` files in both `server` and `client` directories based on the provided `.env.example` files.

4. Start the development servers:

 bash
 
 Start backend from project root directory 
 
    cd backend && npm start
 
 Start frontend from project root directory 
 
    cd client && npm run dev  
 
 This will concurrently start both frontend and backend.

## Environment Variables

### Server (.env)
MONGODB=`uri`

IMAGEKIT_ENDPOINT=`endpoint`

IMAGEKIT_PUBLIC_KEY=`public key`

IMAGEKIT_PRIVATE_KEY=`secret key`

VITE_API_URL

### Client (.env)
VITE_API_URL=`webapp domain`

## Contributing

Pull requests are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Gabriele Cocilovo - coccigab@gmail.com  
