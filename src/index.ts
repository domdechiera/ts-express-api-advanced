import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { register, login } from './controllers/authentication';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URL = 'mongodb+srv://dom:Ended3-Elbow4-Womanly5-Crook1@cluster0.4didm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.post('/auth/register', register);
app.post('/auth/login', login);

// Start the server
app.listen(port, () => {
    console.log(`🗲 Server running at http://localhost:${port}/`);
});