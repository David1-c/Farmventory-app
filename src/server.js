import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import userRoutes from './routes/userRoute.js';
import inventoryRoutes from './routes/inventoryRoute.js';
import harvestRoutes from './routes/harvestRoute.js';
import pestRoutes from './routes/pestRoute.js';
import alertRoutes from './routes/alertRoute.js';
import smsRoutes from './routes/smsRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Default route
app.get('/', (req, res) => {
  res.send('Farm Inventory API is running');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/harvest', harvestRoutes);
app.use('/api/pests', pestRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/sms', smsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
