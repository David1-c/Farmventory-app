import InventoryItem from '../models/InventoryItem.js';

// @desc    Create a new inventory item
// @route   POST /api/inventory
export const createInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, unit, location, description } = req.body;

    const item = new InventoryItem({
      name,
      category,   // e.g., Seed, Fertilizer, Tool
      quantity,
      unit,       // e.g., kg, liters, bags
      location,
      description,
      createdBy: req.user._id, // From authMiddleware
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Get all inventory items
// @route   GET /api/inventory
export const getAllInventoryItems = async (req, res) => {
  try {
    const items = await InventoryItem.find().populate('createdBy', 'name email');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get single inventory item by ID
// @route   GET /api/inventory/:id
export const getInventoryItemById = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Inventory item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Update an inventory item
// @route   PUT /api/inventory/:id
export const updateInventoryItem = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);

    if (item) {
      item.name = req.body.name || item.name;
      item.category = req.body.category || item.category;
      item.quantity = req.body.quantity ?? item.quantity;
      item.unit = req.body.unit || item.unit;
      item.location = req.body.location || item.location;
      item.description = req.body.description || item.description;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Inventory item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Delete an inventory item
// @route   DELETE /api/inventory/:id
export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);

    if (item) {
      await item.deleteOne();
      res.json({ message: 'Inventory item deleted' });
    } else {
      res.status(404).json({ message: 'Inventory item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
