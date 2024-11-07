import { render, screen } from '@testing-library/react';
import App from './App';
import User from '../backend/models/modelUser';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Auth API Tests', () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  test('POST /register - should register a new user', async () => {
    const response = await request(App)
      .post('/api/register') // Adjust the endpoint to your register route
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toEqual(expect.objectContaining({
      name: 'Test User',
      email: 'testuser@example.com'
    }));
  });

  test('POST /login - should log in the user', async () => {
    // First, register a user
    await request(app)
      .post('/api/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    // Now, log in with the same user
    const response = await request(App)
      .post('/api/login') // Adjust the endpoint to your login route
      .send({
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User login successfully');
    expect(response.body).toHaveProperty('token');
  });

  test('POST /login - should return error for invalid credentials', async () => {
    const response = await request(App)
      .post('/api/login')
      .send({
        email: 'wronguser@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
