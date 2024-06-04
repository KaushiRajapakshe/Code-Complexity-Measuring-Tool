exports.getHome = (req, res) => {
    console.log("Loading homepage");
    const user = req.user; 
    res.render('home', { user: user, errorMessage: "" });
};
