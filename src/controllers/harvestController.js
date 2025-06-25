import HarvestLog from '../models/HarvestLog.js';

// @desc    Create a new harvest log
// @route   POST /api/harvest
export const createHarvest = async (req, res) => {
  try {
    const { cropName, quantity, unit, harvestDate, fieldLocation, notes } = req.body;

    const harvest = new HarvestLog({
      cropName,
      quantity,
      unit,
      harvestDate,
      fieldLocation,
      notes,
      recordedBy: req.user._id // From auth middleware
    });

    const savedHarvest = await harvest.save();
    res.status(201).json(savedHarvest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Get all harvest logs
// @route   GET /api/harvest
export const getAllHarvests = async (req, res) => {
  try {
    const harvests = await HarvestLog.find().populate('recordedBy', 'name email');
    res.status(200).json(harvests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get single harvest log by ID
// @route   GET /api/harvest/:id
export const getHarvestById = async (req, res) => {
  try {
    const harvest = await HarvestLog.findById(req.params.id);

    if (harvest) {
      res.json(harvest);
    } else {
      res.status(404).json({ message: 'Harvest log not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Update a harvest log
// @route   PUT /api/harvest/:id
export const updateHarvest = async (req, res) => {
  try {
    const harvest = await HarvestLog.findById(req.params.id);

    if (harvest) {
      harvest.cropName = req.body.cropName || harvest.cropName;
      harvest.quantity = req.body.quantity || harvest.quantity;
      harvest.unit = req.body.unit || harvest.unit;
      harvest.harvestDate = req.body.harvestDate || harvest.harvestDate;
      harvest.fieldLocation = req.body.fieldLocation || harvest.fieldLocation;
      harvest.notes = req.body.notes || harvest.notes;

      const updatedHarvest = await harvest.save();
      res.json(updatedHarvest);
    } else {
      res.status(404).json({ message: 'Harvest log not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Delete a harvest log
// @route   DELETE /api/harvest/:id
export const deleteHarvest = async (req, res) => {
  try {
    const harvest = await HarvestLog.findById(req.params.id);

    if (harvest) {
      await harvest.deleteOne();
      res.json({ message: 'Harvest log deleted' });
    } else {
      res.status(404).json({ message: 'Harvest log not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
