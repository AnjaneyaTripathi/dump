var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var i = 0;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/form_builder");

var questionSchema = new mongoose.Schema({
	question: String,
	qType: String,
	formId: String
});

var Question = mongoose.model("Question", questionSchema);

var formSchema = new mongoose.Schema({
	title: String,
	description: String,
	author: String
});

var Form = mongoose.model("Form", formSchema);

var answerSchema = new mongoose.Schema({
	answer: [[String]],
	formId: String
});

var Answer = mongoose.model("Answer", answerSchema);

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

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

app.get("/", function(req, res) {
	res.redirect("/login");
});

app.get("/login", function(req, res) {
	res.render("cover.ejs");
});

app.get("/register", function(req, res) {
	res.render("register.ejs");
});
// home page -- allows us to create a form or view them
app.get("/form", isLoggedIn, function(req, res) {
	Form.find({}, function(err, allForms) {
		if(err) {
			console.log(err);
		}
		else {
			Question.find({}, function(err, allQuestions) {
				if(err) {
					console.log(err);
				}
				else {
					res.render("index.ejs", {f: allForms, q: allQuestions, user: req.user});
				}
			});
		}
	});
});
// new form page -- allows us to choose form title and description
app.get("/form/new", isLoggedIn, function(req, res) {
	Question.find({}, function(err, allQuestions) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("new.ejs", {q: allQuestions});
		}
	});
});
// question panel page -- displays all the questions so far, allows us to add more questions
app.get("/form/question/:formId", isLoggedIn, function(req, res) {
	var id = req.params.formId;
	res.render("temporary.ejs", {formId: id});
});

app.get("/form/newquestion/:formId", isLoggedIn, function(req, res) {
	var id = req.params.formId;
	Question.find({formId: id}, function(err, allQuestions) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("newquestion.ejs", {formId: id, q: allQuestions});
		}
	})
});

app.get("/form/fill/:id", function(req, res) {
	var id = req.params.id;
	Form.find({}, function(err, allForms) {
		if(err) {
			console.log(err);
		}
		else {
			Question.find({}, function(err, allQuestions) {
				if(err) {
					console.log(err);
				}
				else {
					res.render("fill.ejs", {f: allForms, q: allQuestions, formId: id});
				}
			});
		}
	});
});
// in order to view submissions
app.get("/form/submissions/:id", function(req, res) {
	var id = req.params.id;
	Form.find({}, function(err, allForms) {
		if(err) {
			console.log(err);
		}
		else {
			Question.find({}, function(err, allQuestions) {
				if(err) {
					console.log(err);
				}
				else {
					Answer.find({}, function(err, allAnswers) {
						if(err) {
							console.log(err);
						}
						else {
							res.render("submissions.ejs", {id: id, q: allQuestions, f: allForms, a: allAnswers});
						}
					});
				}
			});
		}
	});
});

app.delete("/form/delete/:id", function(req, res) {
	Form.findByIdAndRemove(req.params.id, function(err, removedForm) {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect("/form");
		}
	});
});
// in order to store the form title and description
app.post("/formdetails", isLoggedIn, function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	var author = req.user.username;
	var newForm = {
		title: title,
		description: description,
		author: author
	};
	Form.create(newForm, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			var formId = newlyCreated._id;
			res.redirect("/form/question/"+formId+"");
		}
	});
});
// in order to store a question
app.post("/form/question/:id", function(req, res) {
	var question = req.body.question;
	var qType = req.body.qType;
	var formId = req.params.id;
	var newQuestion = {
		question: question,
		qType: qType,
		formId: formId
	};
	Question.create(newQuestion, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect("/form/question/"+formId+"")
		}
	})
});

app.post("/form/:id", function(req, res) {
	var id = req.params.id;
	Question.find({}, function(err, allQuestions) {
		if(err) {
			console.log(err);
		}
		else {
			var answer = req.body.answer;
			var formId = id;
			console.log(formId);
			var newAnswer = {
				answer: answer,
				formId: formId
			};
			Answer.create(newAnswer, function(err, newlyCreated) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(newlyCreated);
					res.redirect("/form");
				}
			});
		}
	});
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
		successRedirect: "/form",
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

