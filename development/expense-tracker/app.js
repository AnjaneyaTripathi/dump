var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var totalExpense = 0;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/personal_tracker");

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

var itemSchema = new mongoose.Schema({
	name: String,
	price: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

var Item = mongoose.model("Item", itemSchema);

app.use(require("express-session")({
	secret: "This is the personal tracker webApp",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/dashboard", isLoggedIn, function(req, res) {
	Item.find({}, function(err, allItems) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("index.ejs", {items: allItems, totalExpense: totalExpense, user: req.user});
		}
	});
	// res.render("index.ejs");
});

app.post("/dashboard", isLoggedIn, function(req, res) {
	var name = req.body.name;
	var price = req.body.price;
	var description = req.body.description;
	var id = req.user._id;
	var username = req.user.username;
	var newItem = { 
		name: name, 
		price: price, 
		description: description,
		author: {
			id: id,
			username: username
		} 
	};
	Item.create(newItem, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect("/dashboard")
		}
	});
});

app.get("/dashboard/new", isLoggedIn, function(req, res) {
	res.render("new.ejs", { user: req.user });
});

app.delete("/dashboard/:id", function(req, res) {
	Item.findByIdAndRemove(req.params.id, function(err, removedItem) {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect("/dashboard");
		}
	});
});

app.get("/", function(req, res) {
	res.render("cover.ejs");
}); 

app.post("/register", function(req, res) {
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("cover.ejs");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/dashboard");
		});
	});
});

app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/dashboard",
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