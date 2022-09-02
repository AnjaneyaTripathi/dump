
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.4;
canvas.height = window.innerHeight * 0.9;
var height = canvas.height;
var width = canvas.width;
var dx = 6;
var rightClicked = false;
var leftClicked = false;
var noOfBullets = 1;
var counter  = 0;
var noOfRocks = 0;
var score = 0;
var level = 0;
var colors = ["#8fbaef", "#a28cce", "#59a899", "#e8e24e", "#c45b54", "#9931bc", "#52cfd3"];
var side;
var paused = false;
var ddx = 1;
var cimage = new Image();
cimage.src = "cannonimage.png";

var image = [];
image.push(new Image());
image[0].src = "blue.png";
image.push(new Image());
image[1].src = "pink.png";
image.push(new Image());
image[2].src = "peach.png";
image.push(new Image());
image[3].src = "turqoise.png";
image.push(new Image());
image[4].src = "red.png";
image.push(new Image());
image[5].src = "yellow.png";

var audio = new Audio("audio.mp3");

window.onload = function() {
	audio.play();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 37) {
		rightClicked = true;
	}

	else if (e.keyCode == 39) {
		leftClicked = true;
	}

	else if (e.keyCode == 32) {
		paused = !paused;
	}

	else if (e.keyCode == 13) {
		start  = true;
	}
}

function keyUpHandler(e) {
    if (e.keyCode == 37) {
        rightClicked = false;
    }

    else if (e.keyCode == 39) {
        leftClicked = false;
    }
}

function drawScenery() {
	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.moveTo(0, height - 40);
	ctx.lineTo(0, height - 240);
	ctx.lineTo(width / 4, 150);
	ctx.lineTo(3 * width / 5, height - 100);
	ctx.lineTo(9 * width / 10, 400);
	ctx.lineTo(width, height - 150);
	ctx.lineTo(width, height - 40);
	ctx.closePath();
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "#92959b";
	ctx.moveTo(0, height - 40);
	ctx.lineTo(0, height - 240);
	ctx.lineTo(0.7 * width / 5, 269);
	ctx.lineTo(0.9 * 6 * width / 25, 290);
	ctx.lineTo(1.04 * width / 4, 230);
	ctx.lineTo(7 * width / 20, 266);
	ctx.lineTo(3 * width / 5, height - 100);
	ctx.lineTo(8 * width / 10, 452);
	ctx.lineTo(9 * width / 10, 470);
	ctx.lineTo(19 * width / 20, 455);
	ctx.lineTo(width, height - 150);
	ctx.lineTo(width, height - 40);
	ctx.closePath();
	ctx.fill();
}

function Cloud() {
	this.x = -120;
	this.x1 = -240;
	this.altitude = 70;

	this.update = function() {
		this.x += 0.2;
		this.x1 += 0.4;

		if (this.x  - 40 > width) {
			this.x = -120;
		}

		if (this.x1 - 120 > width) {
			this.x1 = -40;
		}

		this.draw();
	}

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = "#e3f9f9";
		ctx.arc(this.x, this.altitude, 40, Math.PI, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#e3f9f9";
		ctx.arc(this.x + 40, this.altitude, 20, Math.PI, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#e3f9f9";
		ctx.arc(this.x + 80, this.altitude, 30, Math.PI, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#e3f9f9";
		ctx.arc(this.x1, this.altitude + 100, 20, Math.PI, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#e3f9f9";
		ctx.arc(this.x1 - 40, this.altitude + 100, 40, Math.PI, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#e3f9f9";
		ctx.arc(this.x1 - 80, this.altitude + 100, 30, Math.PI, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
}

var cloud = new Cloud();

function Ground() {
	this.x = 0;
	this.y = height - 50;

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = "#234427";
		ctx.rect(this.x, this.y, width, height);
		ctx.fill();
		ctx.closePath();
	}
}

var ground = new Ground();


function Cannon() {
	this.x = width / 2 -30;
	this.y = height - 90;
	this.width = 60;
	this.height = 40;

	this.update = function() {

		if (leftClicked) {
			dx = 6;
		}
		if (rightClicked) {
			dx = -6;
		}
		if (this.x > width - 60) {
			this.x = width - 60;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		if (!leftClicked && !rightClicked) {
			dx = 0;
		}

		this.x += dx;

		this.draw();
	}

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = "#8c5912";
		// ctx.rect(this.x, this.y, this.width, this.height);
		ctx.drawImage(cimage, this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.closePath();
	}
}

var cannon = new Cannon();

function Bullet() {
	this.radius = 3;
	this.x = cannon.x + 30;
	this.y = cannon.y;
	this.speed = 15;
	var x = 1;

	this.update = function() {
		this.y -= this.speed;
		if (score / 100 > x) {
			this.speed += 1;
			x++;
		}
		this.draw();
	} 

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
}

var bullets = [];
var bullet = new Bullet();
bullets.push(bullet);

function Rock(side, xPos, yPos) {
	var direction = side;
	if (xPos > 0 && yPos > 0) {
		this.x = xPos;
		this.y = yPos;
		this.ySpeed = -2;
		this.chance = false;
		this.health = Math.round(40 + Math.random() * 20);
	}
	else {
		this.chance = true;
		this.ySpeed = 2;
		this.health = Math.round(80 + Math.random() * 50);
		direction = 1;
		this.y = 30 + Math.random() * 200;
		if (side > 0) {
			this.x = 0;
		}
		else {
			this.x = width - 60;
			direction = -1;
		}
	}
	
	var i = Math.round(Math.random() * 5);
	// this.rockColor = colors[i];
	this.xSpeed = 1 * direction;
	this.gravity = 0.025;

	this.update = function() {
		
		if (this.y > ground.y - 60 || this.y <= 0) {
			this.ySpeed = -this.ySpeed;
		}

		if (this.x > width - 60 || this.x < 0) {
			this.xSpeed = -this.xSpeed;
		}

		this.y += this.ySpeed;
		this.x += this.xSpeed;
		this.ySpeed += this.gravity;

		this.draw();
	}

	this.draw = function() {
		ctx.beginPath();
		// ctx.fillStyle = this.rockColor;
		// ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI);
		ctx.drawImage(image[i], this.x, this.y, 60, 60);
		ctx.fill();
		ctx.font = "20px Arial";
		ctx.fillStyle = "#000000"
		ctx.fillText(this.health, this.x + 20, this.y + 20);
		ctx.closePath();
	}

}

var rocks = [];

function isCollidingWithCannon(r) {
	if (r.x + 60 > cannon.x && r.x + 0 < cannon.x + cannon.width && r.y + 60 > cannon.y && r.y + 60 < cannon.y + cannon.height) {
		return true;
	}
}

function isCollidingWithRock(b, r) {
	var a = Math.abs(b.x - r.x - 30);
	var b = Math.abs(b.y - r.y - 30);
	var c = 33;
	if (Math.pow(a, 2) + Math.pow(b, 2) < Math.pow(c, 2)) {
		return true;
	}
}

function createBullets() {
	if (counter % 5 === 0 && noOfBullets < 60) {
		var b = new Bullet();
		bullets.push(b);
		noOfBullets++;
	}
}

function createRocks() {
	if (counter % 700 === 0) {
		var variable = Math.round(Math.random() * 3);
		if (variable % 2 === 0) {
			side = 1;
		} 
		else {
			side = -1;
		}
		var r = new Rock(side, 0, 0);
		rocks.push(r);
		noOfRocks++;
	}
}

function updateGame() {

	if (paused) {
		ctx.font = "40px";
		ctx.fillText("Paused", width / 2, height / 2);
		return;
	}

	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "#a1d4dd";
	ctx.fillRect(0, 0, width, height);
	ctx.fill();
	ctx.fillStyle = "#000000";
	ctx.font = "40px bold";
	ctx.fillText(score, width / 2 - 50, 50);
	cloud.update();
	drawScenery();
	ground.draw();
	cannon.update();
	createBullets();
	createRocks();

	for (var i = 0; i < noOfRocks; i++) {
		r = rocks[i];
		r.update();
	}

	for (var i = 0; i < noOfBullets; i++) {
		b = bullets[i];
		b.update(); 

		if (b.y < 0) {
			b.y = cannon.y;
			b.x = cannon.x + 30;
		}
		
	}

	for (var i = 0; i < noOfRocks; i++) {

		if (isCollidingWithCannon(rocks[i])) {
			alert("Congrats, your score is " + score);
			ctx.fillText("Game Over", 200, 200);
			var highScore = localStorage.getItem("highScore");
			if (score > highScore) {
				alert("New High Score");
				localStorage.setItem("highScore", score);
			}
	        document.location.reload();
	        clearInterval(interval);
		}

		for (var j = 0; j < noOfBullets; j++) {

			if (rocks[i].health <= 0) {

				if (rocks[i].chance) {
					var r1 = new Rock(1, rocks[i].x, rocks[i].y);
					noOfRocks++;
					rocks.push(r1);
					var r2 = new Rock(-1, rocks[i].x, rocks[i].y);
					noOfRocks++;
					rocks.push(r2);

					rocks.splice(i, 1);
					noOfRocks--;
					score--;
					level += 5;
				}

				else {
					rocks.splice(i, 1);
					noOfRocks--;
					score--;
					level += 5;
				}
			}

			if (isCollidingWithRock(bullets[j], rocks[i])) {
				bullets.splice(j, 1);
				noOfBullets--;
				rocks[i].health--;
				score++;
			}
		}
	}

	counter++;
}

var interval = setInterval(updateGame, 10);