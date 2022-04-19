window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
}

const gridSize = 20;
const tileCount = 20;

let speedX = 0;
let speedY = 0;
let playerX = 10;
let playerY = 10;
let trail = [];
let tail = 5;

let appleX = 15;
let appleY = 15;

function keyPush(event) {
    switch (event.keyCode) {
        case 37:
            speedX = -1;
            speedY = 0;
            break;
        case 38:
            speedX = 0;
            speedY = -1;
            break;
        case 39:
            speedX = 1;
            speedY = 0;
            break;
        case 40:
            speedX = 0;
            speedY = 1;
            break;
    }
}

function game() {
    playerX += speedX;
    playerY += speedY;

    if (playerX > tileCount-1) {
        playerX = 0;
    }
    if (playerX < 0) {
        playerX = tileCount-1;
    }
    if (playerY > tileCount-1) {
        playerY = 0;
    }
    if (playerY < 0) {
        playerY = tileCount-1;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x*gridSize, trail[i].y*gridSize , gridSize-2, gridSize-2);
        if  (trail[i].x == playerX && trail[i].y == playerY) {
            tail = 5;
        }
    }
    trail.push({x:playerX, y:playerY});
    while (trail.length>tail) {
        trail.shift();
    }

    if  (appleX == playerX && appleY == playerY) {
        tail++;
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
    }
    context.fillStyle = "red";
    context.fillRect(appleX*gridSize, appleY*gridSize , gridSize-2, gridSize-2);
}
