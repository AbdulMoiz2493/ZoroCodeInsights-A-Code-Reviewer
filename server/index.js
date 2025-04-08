import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import codeReviewRoutes from './routes/codeReview.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:8080', // Your Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data

// Routes
app.use('/api/code-review', codeReviewRoutes);

// Socket.io for real-time collaboration
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('code-change', ({ roomId, code }) => {
    socket.to(roomId).emit('code-update', code);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    httpServer.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));