import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/db.js';
import alertRoute from './routes/alertRoute.js';
import smsRoute from './smsRoute.js';
import inventoryRoute from './inventoryRoute.js';
import harvestRoute from './harvestRoute.js';
import pestRoute from './routes/pestRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

//Initialling the application 
const app = express();

//connect DB 
connectDB();

//middleware
app.use(express.json()); // for parsing JSON body
app.use(cors())

//Mounting the route
app.use('/', alertRoute);
app.use('/api', smsRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/harvests', harvestRoute);
app.use('/api/pests', pestRoute);
app.use('/api/users', userRoute);


//Listen to our server
const PORT = process.env.PORT ||3000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

