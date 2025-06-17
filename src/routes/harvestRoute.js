import express from 'express';
const router = express.Router();

// In-memory mock data (replace with DB in real apps)
let harvests = [
  { id: 1, crop: 'Maize', quantityKg: 200, date: '2025-06-01', location: 'Farm A' },
  { id: 2, crop: 'Cassava', quantityKg: 500, date: '2025-06-05', location: 'Farm B' }
];

// GET all harvests
router.get('/', (req, res) => {
  res.json(harvests);
});

// POST new harvest
router.post('/', (req, res) => {
  const { crop, quantityKg, date, location } = req.body;
  if (!crop || !quantityKg || !date || !location) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newHarvest = {
    id: harvests.length + 1,
    crop,
    quantityKg,
    date,
    location
  };

  harvests.push(newHarvest);
  res.status(201).json(newHarvest);
});

// PUT update harvest
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { crop, quantityKg, date, location } = req.body;

  const harvest = harvests.find(h => h.id === id);
  if (!harvest) {
    return res.status(404).json({ error: 'Harvest not found.' });
  }

  harvest.crop = crop ?? harvest.crop;
  harvest.quantityKg = quantityKg ?? harvest.quantityKg;
  harvest.date = date ?? harvest.date;
  harvest.location = location ?? harvest.location;

  res.json(harvest);
});

// DELETE a harvest record
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = harvests.findIndex(h => h.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Harvest not found.' });
  }

  harvests.splice(index, 1);
  res.json({ message: 'Harvest record deleted successfully.' });
});

export default router;
