import Alert from '../models/Alert.js';

// @desc    Create a new alert
// @route   POST /api/alerts
export const createAlert = async (req, res) => {
  try {
    const { title, message, type, severity, relatedItem } = req.body;

    const alert = new Alert({
      title,
      message,
      type,        // e.g., 'Inventory', 'Pest', 'Harvest'
      severity,    // e.g., 'Low', 'Medium', 'High'
      relatedItem, // Optional: Link to Inventory ID or Pest ID
      createdBy: req.user._id, // Who created the alert (optional)
    });

    const savedAlert = await alert.save();
    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Get all alerts
// @route   GET /api/alerts
export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().populate('createdBy', 'name email');
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get single alert by ID
// @route   GET /api/alerts/:id
export const getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (alert) {
      res.json(alert);
    } else {
      res.status(404).json({ message: 'Alert not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Update alert (e.g., mark as acknowledged)
// @route   PUT /api/alerts/:id
export const updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (alert) {
      alert.status = req.body.status || alert.status;  // 'Pending' or 'Acknowledged'
      alert.severity = req.body.severity || alert.severity;
      alert.message = req.body.message || alert.message;

      const updatedAlert = await alert.save();
      res.json(updatedAlert);
    } else {
      res.status(404).json({ message: 'Alert not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Delete alert
// @route   DELETE /api/alerts/:id
export const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (alert) {
      await alert.deleteOne();
      res.json({ message: 'Alert deleted' });
    } else {
      res.status(404).json({ message: 'Alert not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
