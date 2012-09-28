var users = [
{
    id: 1, 
    username: 'bob', 
    password: 'secret', 
    email: 'bob@example.com'
}
, {
    id: 2, 
    username: 'joe', 
    password: 'birthday', 
    email: 'joe@example.com'
}
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {return next();}
  res.redirect('/')
}

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app,passport,settings){


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) {return done(err);}
        if (!user) {return done(null, false, {message: 'Unknown user ' + username});}
        if (user.password != password) {return done(null, false, {message: 'Invalid password'});}
        return done(null, user);
      })
    });
  }
));



    var db = require('./lib/database')(app,null);
	    
    app.get('/', function(req, res){
        res.render('index', {
            user: req.user
        });
    });

    app.get('/projects', ensureAuthenticated, function(req, res){
        res.render('projects', {
            user: req.user,
            request : req.query, 
            projects : [{
                name : "Project A"
            },{
                name : "Project B"
            }]
        });
    });

    app.get('/newproject', ensureAuthenticated, function(req, res){
        res.render('new-project', {
            user: req.user, 
            scheme : db.scheme.project
        });
    });

    app.post('/projects', function(req, res){
        db.addProject(req.body,function(err,ret){
            if(err){
                res.writeHead(err.code);
                res.end(err.msg);
            } else{
                res.json({
                    redirect : '/projects?newproject=asdsdasdsasd'
                });
            }
        })
    });

    app.get('/account', ensureAuthenticated, function(req, res){
        res.render('account', {
            user: req.user
        });
    });

    app.post('/login', 
        passport.authenticate('local', {
            failureRedirect: '/', 
            failureFlash: true
        }),
        function(req, res) {
            res.redirect('/');
        });
	  
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

};
