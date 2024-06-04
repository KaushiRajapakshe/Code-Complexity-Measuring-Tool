// profileController.test.js

const profileController = require('../../controllers/profileController');
const User = require('../../models/userModel');

jest.mock('../../models/userModel'); // Mock the userModel module

describe('ProfileController', () => {
  describe('getProfile', () => {
    it('should render the profile page with user details', async () => {
      const req = {
        params: { username: 'testuser' },
        db: {} // Mock the db object
      };
      const res = {
        render: jest.fn()
      };
      const user = { username: 'testuser', email: 'test@example.com' };
      User.findByUsername.mockResolvedValue(user);

      await profileController.getProfile(req, res);

      expect(User.findByUsername).toHaveBeenCalledWith(req.db, 'testuser');
      expect(res.render).toHaveBeenCalledWith('profile', { user: user });
    });

    
  });

  describe('postUpdateProfile', () => {
    it('should update the user profile and render the home page with updated user details', async () => {
      const req = {
        body: { email: 'test@example.com', newUsername: 'newusername', password: 'newpassword' },
        db: {} // Mock the db object
      };
      const res = {
        render: jest.fn()
      };
      const resInfo = { status: true, data: { username: 'newusername', email: 'test@example.com' } };
      User.updateUser.mockResolvedValue(resInfo);

      await profileController.postUpdateProfile(req, res);

      expect(User.updateUser).toHaveBeenCalledWith(req.db, 'test@example.com', 'newusername', 'newpassword');
      expect(res.render).toHaveBeenCalledWith('home', { user: resInfo.data });
    });

    
  });

  describe('deactivateProfile', () => {
    it('should deactivate the user profile and redirect to home page', async () => {
      const req = {
        body: { email: 'test@example.com' },
        db: {} // Mock the db object
      };
      const res = {
        clearCookie: jest.fn(),
        redirect: jest.fn()
      };
      const result = { status: true };
      User.deactivateUser.mockResolvedValue(result);

      await profileController.deactivateProfile(req, res);

      expect(User.deactivateUser).toHaveBeenCalledWith(req.db, 'test@example.com');
      expect(res.clearCookie).toHaveBeenCalledWith('token');
      expect(res.redirect).toHaveBeenCalledWith('/');
    });

    
  });
});
