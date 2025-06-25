import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import InventoryItem from '../models/InventoryItem.js';

// Connect to test database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/farmdb_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clear database before each test
beforeEach(async () => {
  await InventoryItem.deleteMany();
});

// Disconnect after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Inventory API Test', () => {

  it('should create a new inventory item', async () => {
    const newItem = {
      name: 'Maize Seeds',
      category: 'Seed',
      quantity: 100,
      unit: 'kg',
      description: 'High yield maize seeds',
      location: 'Warehouse A'
    };

    const res = await request(app)
      .post('/api/inventory')
      .send(newItem);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Maize Seeds');
  });

  it('should get all inventory items', async () => {
    const item = new InventoryItem({
      name: 'NPK Fertilizer',
      category: 'Fertilizer',
      quantity: 50,
      unit: 'kg',
      description: 'For maize and cassava',
      location: 'Store A'
    });
    await item.save();

    const res = await request(app).get('/api/inventory');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('NPK Fertilizer');
  });

  it('should update an inventory item', async () => {
    const item = new InventoryItem({
      name: 'Pesticide',
      category: 'Pesticide',
      quantity: 20,
      unit: 'liters',
      location: 'Store B'
    });
    await item.save();

    const res = await request(app)
      .put(`/api/inventory/${item._id}`)
      .send({ quantity: 25 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(25);
  });

  it('should delete an inventory item', async () => {
    const item = new InventoryItem({
      name: 'Urea Fertilizer',
      category: 'Fertilizer',
      quantity: 30,
      unit: 'kg',
      location: 'Store C'
    });
    await item.save();

    const res = await request(app).delete(`/api/inventory/${item._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Item deleted');
  });
});
