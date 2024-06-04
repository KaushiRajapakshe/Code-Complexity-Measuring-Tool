const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
    const username = req.params.username;
    const user = await User.findByUsername(req.db, username);
    res.render("profile", { user: user });
};

exports.postUpdateProfile = async (req, res) => {
    const { email, newUsername, password } = req.body;
    const resInfo = await User.updateUser(req.db, email, newUsername, password);
    res.render('home', { user: resInfo.data });
};
exports.deactivateProfile = async (req, res) => {
    console.log('Deactivating profile...');
    const { email } = req.body;
    console.log("body",req.body);
    const result = await User.deactivateUser(req.db, email);
    console.log({result});
    if (result.status) {
      res.clearCookie('token');
      res.redirect('/');
    } else {
      res.render('profile', { errorMessage: 'Error deactivating profile' });
    }
  };