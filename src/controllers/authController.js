const User = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render("login", { errorMessage: "" });
};

exports.getSignup = (req, res) => {
    res.render('signup', { errorMessage: "" });
};

exports.postSignup = async (req, res) => {
    console.log("Signing up user...", req.body);
    const { email, username, password } = req.body;
    const statusInfo = await User.signUpUser(req.db, email, username, password);

    if (statusInfo.status) {
        // Automatically log in the user after successful signup
        const loginReq = {
            body: {
                email: email,
                password: password
            },
            db: req.db
        };
        this.postLogin(loginReq, res);
    } else {
        res.render('signup', { errorMessage: statusInfo.errorMessage });
    }
};

exports.postLogin = async (req, res) => {
    console.log("Logging in user...", req.body);
    const { email, password } = req.body;
    const success = await User.checkLogin(req.db, email, password);
    console.log({success});
    if (success.status) {
        console.log("Redirecting to hompage");
        res.cookie('token', success.token, { httpOnly: true });
        res.redirect("/home");
    } else {
        res.render("login", { errorMessage: success.data });
    }
};

exports.postLogout = (req, res) => {
    console.log("Logging out user...");
    res.clearCookie('token');
    res.redirect("/login");
  };
  