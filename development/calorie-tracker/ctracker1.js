//for creating the pop-up
var count = document.getElementById("data");
var add = document.getElementById("add");
var clear = document.getElementById("clear");
var blue1 = document.getElementById("blue1");
var blue2 = document.getElementById("blue2");
var blue3 = document.getElementById("blue3");
var blue4 = document.getElementById("blue4");
var blue5 = document.getElementById("blue5");
var blue6 = document.getElementById("blue6");
var blue7 = document.getElementById("blue7");
var blue8 = document.getElementById("blue8");
var rcal = 0;
var check = document.getElementById("enterDetails");
var x = 0;
var y1 = 0;
var y2 = 0;
var y3 = 0;
var y4 = 0;
var y5 = 0;
var y6 = 0;
var y7 = 0;
var y8 = 0;

//keeping count of the number of food items added to the list 
var counter = 0;

//hydration counter

blue1.addEventListener("click", function() {
	if (y1 == "0") {
		document.getElementById("blue1").style.color = "blue";
		y1 = 1;
	}
	else {
		document.getElementById("blue1").style.color = "black";
		y1 = 0
	}
});
blue2.addEventListener("click", function() {
	if (y2 == "0") {
		document.getElementById("blue2").style.color = "blue";
		y2 = 1;
	}
	else {
		document.getElementById("blue2").style.color = "black";
		y2 = 0
	}
});
blue3.addEventListener("click", function() {
	if (y3 == "0") {
		document.getElementById("blue3").style.color = "blue";
		y3 = 1;
	}
	else {
		document.getElementById("blue3").style.color = "black";
		y3 = 0
	}
});
blue4.addEventListener("click", function() {
	if (y4 == "0") {
		document.getElementById("blue4").style.color = "blue";
		y4 = 1;
	}
	else {
		document.getElementById("blue4").style.color = "black";
		y4 = 0
	}
});
blue5.addEventListener("click", function() {
	if (y5 == "0") {
		document.getElementById("blue5").style.color = "blue";
		y5 = 1;
	}
	else {
		document.getElementById("blue5").style.color = "black";
		y5 = 0
	}
});
blue6.addEventListener("click", function() {
	if (y6 == "0") {
		document.getElementById("blue6").style.color = "blue";
		y6 = 1;
	}
	else {
		document.getElementById("blue6").style.color = "black";
		y6 = 0
	}
});
blue7.addEventListener("click", function() {
	if (y7 == "0") {
		document.getElementById("blue7").style.color = "blue";
		y7 = 1;
	}
	else {
		document.getElementById("blue7").style.color = "black";
		y7 = 0
	}
});
blue8.addEventListener("click", function() {
	if (y8 == "0") {
		document.getElementById("blue8").style.color = "blue";
		y8 = 1;
	}
	else {
		document.getElementById("blue8").style.color = "black";
		y8 = 0
	}
});

//pop-up for the calculations

check.addEventListener("click", function() {
	if(x == "0") {
		document.getElementById("reqcal").style.display = "block";
		x = 1;
	}
	else {
		document.getElementById("reqcal").style.display = "none";
		x = 0;
	}
});

//function to calculate the required calorie conrent

count.addEventListener("click", function() {

	localStorage.clear();
	document.getElementById("dialoguebox").style.visibility = "hidden";

	var age = parseInt(document.getElementById("age").value);
	var height = parseInt(document.getElementById("height").value);
	var weight = parseInt(document.getElementById("weight").value);
	var gender = document.calculator.gender.value;
	var life = document.calculator.lifestyle.value;
	var s = 0;

	//saving to local storage

	localStorage.setItem("age", age);
	localStorage.setItem("height", height);
	localStorage.setItem("weight", weight);
	localStorage.setItem("gender", gender);
	localStorage.setItem("life", life);

	if(age !== "" && height !== "" && weight !== "" && gender !== "" && age > 0 && height > 0 && weight > 0) {
		if(gender == "male") {
			s = 5;
		}
		else {
			s = -125;
		}
		rcal = (10 * weight) + (6.25 * height) - (5 * age) + s;

		rcal = rcal * life;

		document.getElementById("requirements").style.visibility = "visible";
		document.getElementById("notify").innerHTML = "Okay there, looks like you need a daily requirement of " + rcal + " kcal. So get going, start eating, but don't over-eat. XD.";
	}
	else {
		alert("Be reasonable!");
	}

	
});

//retrieving the data from the local storage for calculations

var age = localStorage.getItem("age");
var height = localStorage.getItem("height");
var weight = localStorage.getItem("weight");
var gender = localStorage.getItem("gender");
var life = localStorage.getItem("life");
var s;

if(gender == "male") {
	s = 5;
}
else {
	s = -125;
}

rcal = (10 * weight) + (6.25 * height) - (5 * age) + s;

rcal = rcal * life;

document.getElementById("requirements").style.visibility = "visible";
document.getElementById("notify").innerHTML = "Okay there, looks like you need a daily requirement of " + rcal + " kcal. So get going, start eating, but don't over-eat. XD.";

//adding to the food list

add.addEventListener("click", function() {

	counter++;
	//used to clear the input field
	var foodform = document.getElementById("items");
	//adding the food item to the list
	var fname = document.getElementById("name").value;
	var foodlist = document.getElementById("foodlist");
	var list = document.createElement("li");
	var fooditem = document.createTextNode(fname);
	list.className = "food";
	//adding the calorie content to the same list
	var cal = document.getElementById("cal").value;
	var foodcal = document.createTextNode(cal);
	var calp = document.createElement("span");
	calp.className = "foodcalorie";
	//appending the food and calorie content
	if(fname === "" || cal === "") {
		alert("Enter vaild values");
	}
	else {
		calp.appendChild(foodcal);
		list.appendChild(fooditem);
		list.appendChild(calp);
		foodlist.appendChild(list);
	}

	//saving food items to the local storage

	localStorage.setItem("fkey" + counter, fname);
	localStorage.setItem("ckey" + counter, cal);
	localStorage.setItem("counter", counter);

	//for updating calories upon adding a food item

	var food = document.getElementById("name").value;
	var message = "";
	rcal = rcal - cal;
	if(rcal>0) {
		message = "Hey there! Better start eating more, you've not reached your daily requirements. Another " + rcal + " kcal should be enough!";
	}
	else if(rcal<0) {
		message = "Woah! That's enough, how about a couple of push-ups or jumping-jacks?";
		document.getElementById("message").style.color = "red";
	}

	document.getElementById("dialoguebox").style.visibility = "visible";
	document.getElementById("message").innerHTML = message;
	foodform.reset();
});

//retrieving data from the local storage for the list

var foodies = [];
var callies = [];

counter = parseInt(localStorage.getItem("counter"));
if (!counter) {
	counter = 0;
}
else {
	for (var i = 1; i < counter + 1; i++) {

		foodies[i] = localStorage.getItem("fkey" + i);
		callies[i] = localStorage.getItem("ckey" + i);

		var foodlist = document.getElementById("foodlist");
		var list = document.createElement("li");
		var fooditem = document.createTextNode(foodies[i]);
		list.className = "food";
		var foodcal = document.createTextNode(callies[i]);
		var calp = document.createElement("span");
		calp.className = "foodcalorie";

		calp.appendChild(foodcal);
		list.appendChild(fooditem);
		list.appendChild(calp);
		foodlist.appendChild(list);

		rcal = rcal - callies[i];

		if(rcal>0) {
			message = "Hey there! Better start eating more, you've not reached your daily requirements. Another " + rcal + " kcal should be enough!";
		}
		else if(rcal<0) {
			document.getElementById("message").style.color = "red";
			message = "Woah! That's enough, how about a couple of push-ups or jumping-jacks?";
		}
		document.getElementById("dialoguebox").style.visibility = "visible";
		document.getElementById("message").innerHTML = message;
	}
}

//clearing the local storage

clear.addEventListener("click", function() {
	localStorage.clear();
});








