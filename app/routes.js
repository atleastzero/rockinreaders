const { authenticate } = require("passport");

module.exports = function(app, passport) {
    // =====================================
    // Base Pages ==========================
    // =====================================
    app.get('/', (req, res) => {
        res.render('home');
    });
      
    app.get('/about', (req, res) => {
        res.render('about');
    });
    
    app.get('/reading-levels', (req, res) => {
        res.render('reading-levels');
    });
    
    // =====================================
    // Reading Level Pages =================
    // =====================================
    app.get('/cool-cats', (req, res) => {
        res.render('cool-cats');
    });
    
    app.get('/rockin-rollers', (req, res) => {
        res.render('rockin-rollers');
    });
    
    app.get('/rock-stars', (req, res) => {
        res.render('rock-stars');
    });
    
    app.get('/super-stars', (req, res) => {
        res.render('super-stars');
    });
    
    app.get('/mega-stars', (req, res) => {
        res.render('mega-stars');
    });
    
    app.get('/rock-legends', (req, res) => {
        res.render('rock-legends');
    });

    // =====================================
    // Authentication Pages ================
    // =====================================
    app.get('/login', function(req, res) {
        res.render('login', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/register', function(req, res) {
        res.render('register', { message: req.flash('signupMessage') });
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/', { message: req.flash('mustBeLoggedInMessage') });
}