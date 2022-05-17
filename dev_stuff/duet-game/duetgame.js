var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var height = canvas.height;
var width = canvas.width;
var x = 0;
var dx = 0.02;
var down = 1;
var posX = width / 2;
var posY = 0;
var rightClicked = false;
var leftClicked = false;
var count = 0;
var ddx = 0;
var score = 0;
var counter = 0;
var paused = false;
var oCount = 0;
var chance = true;
var scoreA = 0;
var scoreB = 0;
var single = true;

if (localStorage.getItem("chance") === "a") {
	chance = false;
}

if (localStorage.getItem("chance") === "b") {
	chance = true;
}

if (localStorage.getItem("single") === "s") {
	single = false;
}

scoreA = localStorage.getItem("scoreA");
scoreB = localStorage.getItem("scoreB");

if (!scoreA) {
	scoreA = 0;
}

if (!scoreB) {
	scoreB = 0;
}

scoreA = parseInt(scoreA);
scoreB = parseInt(scoreB);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightClicked = true;
	}

	else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftClicked = true;
	}

	//pausing the game

	else if (e.keyCode === 32) {
		paused = !paused;
	}

	//restarting the game

	else if (e.keyCode === 8) {
		document.location.reload();
	    clearInterval(interval);
	}

	//changing to multiplayer

	else if (e.keyCode === 77) {
		single = false;
		localStorage.setItem("single", "s");
		document.location.reload();
	    clearInterval(interval);
	}

	//changing to single player

	else if (e.keyCode === 83) {
		single = true;
		localStorage.clear();
		document.location.reload();
	    clearInterval(interval);
	}
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightClicked = false;
    }

    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftClicked = false;
    }

}


function drawDuets() {
	ctx.beginPath();
	ctx.arc(width / 2, 3 * height / 4, 100, 0, 2 * Math.PI);
	ctx.strokeStyle = "#c9c9c9";
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(width / 2 - 100 * Math.cos(x), 3 * height / 4 + 100 * Math.sin(x), 10, 0, 2 * Math.PI);
	ctx.fillStyle = "#f707bf"
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(width / 2 + 100 * Math.cos(x), 3 * height / 4 - 100 * Math.sin(x), 10, 0, 2 * Math.PI);
	ctx.fillStyle = "#1c7bef";
	ctx.fill();
	ctx.closePath();
}


var obstacles = [];
var obstacleHeight = 20;
var obstacleWidth = 100;
var totalObstacles = 1;

for (var i = 0; i < totalObstacles; i++) {
	addObstacles();
}

function addObstacles() {
	var obstacle = {
		oHeight: obstacleHeight,
		oWidth: obstacleWidth
	};

	createObstacle(obstacle);
	obstacles.push(obstacle);
}

function createObstacle(obstacle) {
	obstacle.x = width / 2 - 200 + Math.random() * 400;
	obstacle.y = Math.random() * 200;
	obstacle.speed = 1 + ddx;
}


function draw() {

	//single player

	if (single) {

		if (paused) {
			ctx.fillText("Paused", width / 2, height / 2);
			return;
		}

		ctx.clearRect(0, 0, width, height);
		drawDuets();

		var phoebeX = width / 2 - 100 * Math.cos(x);
		var phoebeY = 3 * height / 4 + 100 * Math.sin(x);
		var rishavX = width / 2 + 100 * Math.cos(x);
		var rishavY = 3 * height / 4 - 100 * Math.sin(x);

		for (var i = 0; i < totalObstacles; i++) {
			var obstacle = obstacles[i];
			ctx.fillStyle = "#a3a3a3";
			ctx.fillRect(obstacle.x, obstacle.y, obstacle.oWidth, obstacle.oHeight);
			obstacle.y += obstacle.speed + ddx;

			if (obstacle.y > height) {
				createObstacle(obstacle);
				ddx = ddx + 0.033;
				oCount++;
				if (oCount * totalObstacles % 5 == 0) {
					totalObstacles++;
					addObstacles();
				}
			}

			if (rishavX > obstacle.x - 10 && rishavX < obstacle.x + obstacle.oWidth + 10 && rishavY > obstacle.y - 10 && rishavY < obstacle.y + obstacle.oHeight + 10) {
				alert("Congrats, your score is " + score);
	            document.location.reload();
	            clearInterval(interval);
			}

			if (phoebeX > obstacle.x - 10 && phoebeX < obstacle.x + obstacle.oWidth + 10 && phoebeY > obstacle.y - 10 && phoebeY < obstacle.y + obstacle.oHeight + 10) {
				alert("Congrats, your score is " + score);
	            document.location.reload();
	            clearInterval(interval);
			}

		}

		if (leftClicked) {
			dx = 0.02;
		}

		if (rightClicked) {
			dx = -0.02;
		}

		if (!leftClicked && !rightClicked) {
			dx = 0;
		}

		x += dx;

		ctx.font = "20px Times New Roman";
	    ctx.fillStyle = "white";
	    ctx.fillText("Score: " + score, 20, 40);
	    ctx.fillText("(space) to Pause", 20, 70);
	    ctx.fillText("(backspace) to Restart", 20, 100);
	    ctx.fillText("\"M\" for Multiplayer", 20, 130);
	    ctx.fillText("\"S\" for Single Player", 20, 160);

	    if(counter % 100 == 0) {
	    	score = score + 1;	
	    }

	    counter = counter + 1;

	}

	//multiplayer

	else {

		if (paused) {
			ctx.fillText("Paused", width / 2, height / 2);
			return;
		}

		ctx.clearRect(0, 0, width, height);
		drawDuets();

		var phoebeX = width / 2 - 100 * Math.cos(x);
		var phoebeY = 3 * height / 4 + 100 * Math.sin(x);
		var rishavX = width / 2 + 100 * Math.cos(x);
		var rishavY = 3 * height / 4 - 100 * Math.sin(x);

		for (var i = 0; i < totalObstacles; i++) {
			var obstacle = obstacles[i];
			ctx.fillStyle = "#a3a3a3";
			ctx.fillRect(obstacle.x, obstacle.y, obstacle.oWidth, obstacle.oHeight);
			obstacle.y += obstacle.speed + ddx;

			if (obstacle.y > height) {
				createObstacle(obstacle);
				ddx = ddx + 0.033;
				oCount++;
				if (oCount * totalObstacles % 5 == 0) {
					totalObstacles++;
					addObstacles();
				}
			}

			if (rishavX > obstacle.x - 10 && rishavX < obstacle.x + obstacle.oWidth + 10 && rishavY > obstacle.y - 10 && rishavY < obstacle.y + obstacle.oHeight + 10) {
				if (chance) {
					alert("Player 1 has scored " + scoreA);
					localStorage.setItem("chance", "a");
					localStorage.setItem("scoreA", scoreA);
				}
				else {
					alert("Player 2 has scored " + scoreB);
					localStorage.setItem("chance", "b");
					localStorage.setItem("scoreB", scoreB);
				}
	            document.location.reload();
	            clearInterval(interval);
	        
			}

			if (phoebeX > obstacle.x - 10 && phoebeX < obstacle.x + obstacle.oWidth + 10 && phoebeY > obstacle.y - 10 && phoebeY < obstacle.y + obstacle.oHeight + 10) {
				if (chance) {
					alert("Player 1 has scored " + scoreA);
					localStorage.setItem("chance", "a");
					localStorage.setItem("scoreA", scoreA);
				}
				else {
					alert("Player 2 has scored " + scoreB);
					localStorage.setItem("chance", "b");
					localStorage.setItem("scoreB", scoreB);

					if (scoreA > scoreB) {
						var diff = scoreA - scoreB;
						alert("Player 1 is leading by " + diff);
					}

					else {
						var diff = scoreB - scoreA;
						alert("Player 2 is leading by " + diff);
					}
				}
	            document.location.reload();
	            clearInterval(interval);
			}

		}

		if (leftClicked) {
			dx = 0.02;
		}

		if (rightClicked) {
			dx = -0.02;
		}

		if (!leftClicked && !rightClicked) {
			dx = 0;
		}

		x += dx;

		ctx.font = "20px Times New Roman";
	    ctx.fillStyle = "white";
	    ctx.fillText(scoreA + " vs. " + scoreB, 20, 40);
	    ctx.fillText("(space) to Pause", 20, 70);
	    ctx.fillText("(backspace) to Restart", 20, 100);
	    ctx.fillText("\"M\" for Multiplayer", 20, 130);
	    ctx.fillText("\"S\" for Single Player", 20, 160);
 
	    if (counter % 100 == 0) {
	    	if (chance) {
	    		scoreA = scoreA + 1;
	    	}
	    	else {
	    		scoreB = scoreB + 1;
	    	}	
	    }

	    counter = counter + 1;

	}	

}

var interval = setInterval(draw, 10);


