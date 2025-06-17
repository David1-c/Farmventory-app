import express from 'express';
const router = express.Router();

// Simulated in-memory inventory data
let inventory = [
  { id: 1, name: 'Laptop', quantity: 10 },
  { id: 2, name: 'Mouse', quantity: 25 }
];

// GET: List all inventory items
router.get('/', (req, res) => {
  res.json(inventory);
});

// POST: Add new inventory item
router.post('/', (req, res) => {
  const { name, quantity } = req.body;
  if (!name || quantity == null) {
    return res.status(400).json({ error: 'Name and quantity are required.' });
  }
  const newItem = { id: inventory.length + 1, name, quantity };
  inventory.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Update an inventory item
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, quantity } = req.body;
  const item = inventory.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  item.name = name ?? item.name;
  item.quantity = quantity ?? item.quantity;
  res.json(item);
});

// DELETE: Remove an inventory item
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = inventory.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }
  inventory.splice(index, 1);
  res.json({ message: 'Item deleted successfully.' });
});

export default router;
