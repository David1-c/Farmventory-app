import express from 'express';
const router = express.Router();

// Simulated user data (in-memory store)
let users = [
  { id: 1, username: 'john_doe', email: 'john@example.com', password: '1234' }
];

// Register new user
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const exists = users.find(user => user.email === email);
  if (exists) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password // In production, hash this!
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully.', user: newUser });
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  res.json({ message: 'Login successful', user });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.json(user);
});

// Update user
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email } = req.body;
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  user.username = username ?? user.username;
  user.email = email ?? user.email;

  res.json({ message: 'User updated.', user });
});

// Delete user
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  users.splice(index, 1);
  res.json({ message: 'User deleted successfully.' });
});

export default router;
