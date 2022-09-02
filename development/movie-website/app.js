var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var request = require("request");
var i = 0;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/movie_web");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	favorites: [String],
	watched: [String],
	toWatch: [String]
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

app.use(require("express-session")({
	secret: "This is the movie webApp",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
	res.redirect("/login");
});

app.get("/login", function(req, res) {
	res.render("login.ejs");
});

app.get("/register", function(req, res) {
	res.render("register.ejs");
});

app.get("/home", isLoggedIn, function(req, res) {
	var user = req.user;
	res.render("index.ejs", {user, user});
});

app.get("/results/search/:name", isLoggedIn, function(req, res) {
	var name = req.params.name;
	var user = req.user;
	var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + name;
	request(url, function(err, response, body) {
		if(!err && response.statusCode == 200) {
			var results = JSON.parse(body);
			res.render("results.ejs", {results: results, name: name, user: user});
		}
	});
});

app.get("/results/show/:id", isLoggedIn, function(req, res) {
	var id = req.params.id;
	var user = req.user;
	var url = "http://www.omdbapi.com/?apikey=thewdb&i=" + id + "&plot=full"; 
	request(url, function(err, response, body) {
		if(!err && response.statusCode == 200) {
			var movie = JSON.parse(body);
			var trailerName = movie["Title"] + " Trailer";
			var URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+trailerName+"&type=video&key=AIzaSyAT4zlHYn61pxAkKsMl1amRE5DkD8JLMKc";
			request(URL, function(ERR, RESPONSE, BODY) {
				if(!ERR && RESPONSE.statusCode == 200) {
					var trailer = JSON.parse(BODY);
					console.log(trailer["items"]["0"]["id"]["videoId"]);
					var trailerId = trailer["items"]["0"]["id"]["videoId"];
					res.render("show.ejs", {movie: movie, user: user, trailerId: trailerId});
				}
			});
		}
	});
});

app.get("/results/show/done/:id/:title", isLoggedIn, function(req, res) {
	var id = req.params.id;
	var title = req.params.title;
	var user = req.user;
	user.watched.push(title);
	user.save();
	res.redirect("/results/show/"+id+"");
});

app.get("/results/show/favorites/:id/:title", isLoggedIn,function(req, res) {
	var id = req.params.id;
	var title = req.params.title;
	var user = req.user;
	user.favorites.push(title);
	user.save();
	res.redirect("/results/show/"+id+"");
});

app.get("/results/show/later/:id/:title", isLoggedIn,function(req, res) {
	var id = req.params.id;
	var title = req.params.title;
	var user = req.user;
	user.toWatch.push(title);
	user.save();
	res.redirect("/results/show/"+id+"");
});

app.get("/profile", isLoggedIn, function(req, res) {
	var user = req.user;
	res.render("profile.ejs", {user: user});
});

app.post("/home", isLoggedIn, function(req, res) {
	var name = req.body.name;
	var omdbId = req.body.omdbId;
	if(name == "" && omdbId == "") {
		res.render("index.ejs");
	}
	else if(name == "") {
		res.redirect("/results/show/"+omdbId+"")
	}
	else if(omdbId == "") {
		res.redirect("/results/search/"+name+"");
	}
});

app.post("/register", function(req, res) {
	if(req.body.password == req.body.cpassword) {
		User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
			if(err) {
				console.log(err);
				return res.render("register.ejs");
			}
			passport.authenticate("local")(req, res, function() {
				res.redirect("/login");
			});
		});
	}
	else {
		res.redirect("/register");
	}
});

app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/home",
		failureRedirect: "/"
	}), function(req, res) {
});

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/");
};

app.listen(3000, function() {
	console.log("Listening");
});

