import express from 'express';
import alertRoute from './routes/alertRoute.js';

const app = express();
const PORT = 3000;

app.use('/', alertRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});