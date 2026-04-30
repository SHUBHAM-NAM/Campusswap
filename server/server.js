const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));  // ← THIS LINE IS MISSING
app.use('/api/notes', require('./routes/notes'));
app.use('/api/user', require('./routes/user'));

app.get('/', (req, res) => {
  res.send('CampusSwap API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});