import Pest from '../models/Pest.js';

// @desc    Report a new pest incident
// @route   POST /api/pests
export const reportPest = async (req, res) => {
  try {
    const { pestType, description, affectedCrops, severity, location, reportDate, status } = req.body;

    const pest = new Pest({
      pestType,
      description,
      affectedCrops,
      severity,      // 'Low', 'Medium', 'High'
      location,
      reportDate,
      status: status || 'Reported',  // Default status
      reportedBy: req.user._id
    });

    const savedPest = await pest.save();
    res.status(201).json(savedPest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Get all pest reports
// @route   GET /api/pests
export const getAllPests = async (req, res) => {
  try {
    const pests = await Pest.find().populate('reportedBy', 'name email');
    res.status(200).json(pests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get a single pest report by ID
// @route   GET /api/pests/:id
export const getPestById = async (req, res) => {
  try {
    const pest = await Pest.findById(req.params.id);

    if (pest) {
      res.json(pest);
    } else {
      res.status(404).json({ message: 'Pest report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Update a pest report (e.g., mark as treated)
// @route   PUT /api/pests/:id
export const updatePest = async (req, res) => {
  try {
    const pest = await Pest.findById(req.params.id);

    if (pest) {
      pest.pestType = req.body.pestType || pest.pestType;
      pest.description = req.body.description || pest.description;
      pest.affectedCrops = req.body.affectedCrops || pest.affectedCrops;
      pest.severity = req.body.severity || pest.severity;
      pest.location = req.body.location || pest.location;
      pest.reportDate = req.body.reportDate || pest.reportDate;
      pest.status = req.body.status || pest.status;

      const updatedPest = await pest.save();
      res.json(updatedPest);
    } else {
      res.status(404).json({ message: 'Pest report not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Delete a pest report
// @route   DELETE /api/pests/:id
export const deletePest = async (req, res) => {
  try {
    const pest = await Pest.findById(req.params.id);

    if (pest) {
      await pest.deleteOne();
      res.json({ message: 'Pest report deleted' });
    } else {
      res.status(404).json({ message: 'Pest report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
