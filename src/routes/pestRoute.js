import express from 'express';
const router = express.Router();

// Mock pest data (replace with database in production)
let pests = [
  { id: 1, name: 'Armyworm', type: 'Insect', infestationLevel: 'High', affectedCrops: ['Maize'], control: 'Pesticides' },
  { id: 2, name: 'Weevil', type: 'Insect', infestationLevel: 'Medium', affectedCrops: ['Yam'], control: 'Proper storage' }
];

// GET all pests
router.get('/', (req, res) => {
  res.json(pests);
});

// POST new pest
router.post('/', (req, res) => {
  const { name, type, infestationLevel, affectedCrops, control } = req.body;

  if (!name || !type || !infestationLevel || !affectedCrops || !control) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newPest = {
    id: pests.length + 1,
    name,
    type,
    infestationLevel,
    affectedCrops,
    control
  };

  pests.push(newPest);
  res.status(201).json(newPest);
});

// PUT update pest
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pest = pests.find(p => p.id === id);
  if (!pest) return res.status(404).json({ error: 'Pest not found.' });

  const { name, type, infestationLevel, affectedCrops, control } = req.body;

  pest.name = name ?? pest.name;
  pest.type = type ?? pest.type;
  pest.infestationLevel = infestationLevel ?? pest.infestationLevel;
  pest.affectedCrops = affectedCrops ?? pest.affectedCrops;
  pest.control = control ?? pest.control;

  res.json(pest);
});

// DELETE pest
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pests.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Pest not found.' });

  pests.splice(index, 1);
  res.json({ message: 'Pest record deleted successfully.' });
});
