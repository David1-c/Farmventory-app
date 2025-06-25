import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/farmdb_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clear the users before each test
beforeEach(async () => {
  await User.deleteMany();
});

// Disconnect from DB after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API Test', () => {

  it('should create a new user', async () => {
    const newUser = {
      name: 'Deji jay',
      email: 'john@example.com',
      phone: '+2348012345678',
      role: 'Manager',
      password: 'securepassword'
    };

    const res = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('John Doe');
    expect(res.body.email).toBe('john@example.com');
  });

  it('should get all users', async () => {
    const user = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+2348012345679',
      role: 'Worker',
      password: 'securepassword'
    });
    await user.save();

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Jane Doe');
  });

  it('should update a user', async () => {
    const user = new User({
      name: 'Sam Worker',
      email: 'sam@example.com',
      phone: '+2348012345680',
      role: 'Worker',
      password: 'securepassword'
    });
    await user.save();

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send({ role: 'Manager' });

    expect(res.statusCode).toBe(200);
    expect(res.body.role).toBe('Manager');
  });

  it('should delete a user', async () => {
    const user = new User({
      name: 'Delete Me',
      email: 'delete@example.com',
      phone: '+2348012345681',
      role: 'Worker',
      password: 'securepassword'
    });
    await user.save();

    const res = await request(app).delete(`/api/users/${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });

});
