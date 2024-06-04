// homeController.test.js

const homeController = require('../../controllers/homeController');

describe('HomeController', () => {
  it('should render the home page with user details', () => {
    // Mock req and res objects
    const req = {
      user: { username: 'testuser', email: 'test@example.com' }
    };
    const res = {
      render: jest.fn()
    };

    // Call the getHome function
    homeController.getHome(req, res);

    // Expect the render function to be called with the correct arguments
    expect(res.render).toHaveBeenCalledWith('home', { user: req.user, errorMessage: "" });
  });

  
});
