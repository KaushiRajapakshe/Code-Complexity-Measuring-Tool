// authController.test.js

const authController = require('../../controllers/authController');
const User = require('../../models/userModel');

jest.mock('../../models/userModel'); // Mock the userModel module

describe('AuthController', () => {
  describe('getLogin', () => {
    it('should render the login page with no error message', () => {
      const req = {};
      const res = {
        render: jest.fn()
      };

      authController.getLogin(req, res);

      expect(res.render).toHaveBeenCalledWith('login', { errorMessage: "" });
    });
  });

  describe('getSignup', () => {
    it('should render the signup page with no error message', () => {
      const req = {};
      const res = {
        render: jest.fn()
      };

      authController.getSignup(req, res);

      expect(res.render).toHaveBeenCalledWith('signup', { errorMessage: "" });
    });
  });

  describe('postSignup', () => {
    it('should sign up a user and automatically log them in if signup is successful', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123'
        }, // Mock the db object
        db: {
          collection: jest.fn().mockReturnThis(),
          insertOne: jest.fn().mockResolvedValue({
            email: 'test@example.com',
            username: 'testuser'
          }),
          findOne: jest.fn().mockResolvedValue({
            email: 'test@example.com',
            username: 'testuser'
          }),
        }
      };
      const res = {
        render: jest.fn(),
        cookie: jest.fn(),
        redirect: jest.fn()
      };
      const statusInfo = { status: true, errorMessage: "" };
      User.signUpUser.mockResolvedValue(statusInfo);
      User.checkLogin.mockResolvedValue(statusInfo);
      await authController.postSignup(req, res);

      expect(User.signUpUser).toHaveBeenCalledWith(req.db, 'test@example.com', 'testuser', 'password123');
    });

  });

});
